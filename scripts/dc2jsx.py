#!/usr/bin/env python3
"""One-off converter: Claude Design `.dc.html` templates -> JSX fragments.

Used to port the handoff bundle in design-handoff/project into React. The output
is a starting point that was then hand-edited (responsive values moved to CSS,
shared chrome extracted), so re-running it will not reproduce app/ exactly.

  python3 scripts/dc2jsx.py "design-handoff/project/Trevio Home.dc.html" > out.jsx
"""
import json
import re
import sys
from html.parser import HTMLParser

ROUTES = {
    'Trevio%20Home.dc.html': '/',
    'Trevio%20Features.dc.html': '/features',
    'Trevio%20Integrations%20Developers.dc.html': '/integrations',
    'Trevio%20AI%20First.dc.html': '/ai-first',
    'Trevio%20Pricing.dc.html': '/pricing',
    'Trevio%20About%20Contact.dc.html': '/about',
}

HOVER = {
    'color:#fff': 'hv-white',
    'border-color:transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#5ED6F7,#8378FF) border-box;box-shadow:0 20px 40px -22px rgba(131,120,255,0.5);transform:translateY(-2px)': 'hv-card',
    'background:#F4F2FF;color:#5B247A': 'hv-nav',
    'color:#1A1A2E;border-color:#D9D4FF': 'hv-tile',
    'background:linear-gradient(135deg,#5ED6F7,#8378FF);color:#fff': 'hv-social',
    'color:#1A1A2E': 'hv-ink',
    'color:#fff;filter:brightness(1.07)': 'hv-bright',
    'color:#fff;transform:scale(1.07)': 'hv-pop',
    'color:#fff;filter:brightness(1.05)': 'hv-bright-sm',
    'color:#5B247A;transform:translateY(-1px)': 'hv-lift',
    'color:#5B247A': 'hv-purple',
    'color:#1BCECF': 'hv-teal',
    'color:#fff;background:rgba(255,255,255,0.14)': 'hv-ghost',
    'color:#1A1A2E;border-color:transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#5ED6F7,#8378FF) border-box;transform:translateY(-2px)': 'hv-card-ink',
    'color:#8378FF': 'hv-violet',
    'border-color:#8378FF;color:#5B247A': 'hv-outline',
    'filter:brightness(1.07)': 'hv-brightness',
    'color:#fff;background:linear-gradient(#161B2A,#161B2A) padding-box,linear-gradient(100deg,#5ED6F7,#8378FF,#1BCECF) border-box;box-shadow:0 0 30px -6px rgba(131,120,255,0.6)': 'hv-dark-glow',
    'color:#fff;background:#0D1117': 'hv-navy',
    'color:#5B247A;border-color:#8378FF;background:#fff': 'hv-outline-light',
    'color:#0D1117;background:#3ADBDC': 'hv-teal-btn',
    'border-color:transparent;color:#fff;background:linear-gradient(100deg,#5B247A,#8378FF 60%,#5ED6F7);box-shadow:0 14px 30px -14px rgba(131,120,255,0.7)': 'hv-pill',
    'border-color:transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#5ED6F7,#8378FF) border-box;box-shadow:0 22px 44px -22px rgba(131,120,255,0.5);transform:translateY(-3px)': 'hv-card-lg',
}
FOCUS = {
    'border-color:#8378FF;box-shadow:0 0 0 4px rgba(131,120,255,0.15)': 'fc-field',
}

ATTR = {
    'viewbox': 'viewBox', 'preserveaspectratio': 'preserveAspectRatio',
    'gradientunits': 'gradientUnits', 'onclick': 'onClick', 'onsubmit': 'onSubmit',
    'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex',
}
TAGS = {'lineargradient': 'linearGradient', 'radialgradient': 'radialGradient', 'animatemotion': 'animateMotion', 'clippath': 'clipPath'}
VOID = {'br', 'input', 'img', 'meta', 'link', 'hr'}
UNITLESS = {'line-height', 'font-weight', 'flex', 'opacity', 'z-index', 'order', 'flex-grow', 'flex-shrink'}
EXPR = re.compile(r'\{\{\s*(.*?)\s*\}\}')


def camel(prop):
    if prop.startswith('-webkit-'):
        prop = 'Webkit-' + prop[8:]
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), prop)


def split_decls(s):
    out, depth, cur = [], 0, ''
    for ch in s:
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        if ch == ';' and depth == 0:
            out.append(cur)
            cur = ''
        else:
            cur += ch
    out.append(cur)
    return [d.strip() for d in out if d.strip()]


def value_js(v):
    """A string that may contain {{ expr }} -> JS expression source."""
    m = EXPR.fullmatch(v.strip())
    if m:
        return m.group(1)
    if EXPR.search(v):
        return '`' + EXPR.sub(lambda m: '${' + m.group(1) + '}', v.replace('`', '\\`')) + '`'
    return json.dumps(v, ensure_ascii=False)


def norm(s):
    return ';'.join(d.replace(': ', ':') for d in split_decls(s))


def style_js(s):
    parts = []
    for d in split_decls(s):
        if ':' not in d:
            continue
        k, v = d.split(':', 1)
        v = v.strip()
        try:
            num = float(v)
            if k.strip() in ('opacity', 'flex', 'z-index', 'order', 'font-weight', 'line-height') and EXPR.search(v) is None:
                parts.append(f'{camel(k.strip())}: {v}')
                continue
        except ValueError:
            pass
        if re.fullmatch(r'-?\d+(\.\d+)?px', v) and k.strip() not in UNITLESS:
            parts.append(f'{camel(k.strip())}: {v[:-2]}')
            continue
        if v == '0' and k.strip() not in UNITLESS:
            parts.append(f'{camel(k.strip())}: 0')
            continue
        parts.append(f'{camel(k.strip())}: {value_js(v)}')
    return '{{ ' + ', '.join(parts) + ' }}'


class Conv(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.stack = []
        self.pre = 0
        self.unknown_hover = set()

    def emit(self, s):
        self.out.append(s)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'sc-for':
            item = a.get('as', 'item')
            lst = EXPR.fullmatch(a['list'].strip()).group(1)
            self.emit(f'{{{lst}.map(({item}, {item}I) => (<Fragment key={{{item}I}}>')
            self.stack.append((tag, False))
            return
        if tag == 'sc-if':
            cond = EXPR.fullmatch(a['value'].strip()).group(1)
            self.emit(f'{{{cond} && (<>')
            self.stack.append((tag, False))
            return
        name = TAGS.get(tag, tag)
        props, classes = [], []
        is_pre = False
        for k, v in attrs:
            if k in ('data-screen-label',) or k.startswith('hint-'):
                continue
            if k == 'style-hover':
                key = norm(v)
                cls = HOVER.get(key)
                if not cls:
                    self.unknown_hover.add(key)
                    cls = 'hv-TODO'
                classes.append(cls)
                continue
            if k == 'style-focus':
                classes.append(FOCUS.get(norm(v), 'fc-TODO'))
                continue
            if k == 'style':
                if 'white-space:pre' in v.replace(' ', '') and 'pre-wrap' not in v:
                    is_pre = True
                props.append(f'style={style_js(v)}')
                continue
            jk = ATTR.get(k, k)
            if not (jk.startswith('data-') or jk.startswith('aria-')) and '-' in jk:
                jk = camel(jk)
            if v is None or (v == '' and jk in ('required', 'disabled', 'checked')):
                props.append(jk)
                continue
            if jk == 'href' and v.split('#')[0] in ROUTES:
                base, _, frag = v.partition('#')
                v = ROUTES[base] + ('#' + frag if frag else '')
            if jk == 'href' and v.startswith('/'):
                name = 'Link'
            if EXPR.search(v):
                props.append(f'{jk}={{{value_js(v)}}}')
            else:
                props.append(f'{jk}={json.dumps(v, ensure_ascii=False)}')
        if classes:
            props.insert(0, f'className="{" ".join(classes)}"')
        self.emit(f'<{name}{" " if props else ""}{" ".join(props)}' + (' />' if tag in VOID else '>'))
        if tag not in VOID:
            self.stack.append((name, is_pre))
            if is_pre:
                self.pre += 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        name, is_pre = self.stack.pop()
        if is_pre:
            self.pre -= 1
        if name == 'sc-for':
            self.emit('</Fragment>))}')
        elif name == 'sc-if':
            self.emit('</>)}')
        else:
            self.emit(f'</{name}>')

    def handle_data(self, data):
        if not data:
            return
        if not data.strip():
            if self.pre:
                self.emit('{' + json.dumps(data) + '}')
            elif '\n' not in data:
                self.emit('{" "}')
            return
        pos = 0
        for m in EXPR.finditer(data):
            self.text(data[pos:m.start()])
            self.emit('{' + m.group(1) + '}')
            pos = m.end()
        self.text(data[pos:])

    def text(self, t):
        if not t:
            return
        if not self.pre:
            t = re.sub(r'\s*\n\s*', ' ', t)
        if re.search(r'[<>{}&\n]', t) or t != t.strip():
            self.emit('{' + json.dumps(t, ensure_ascii=False) + '}')
        else:
            self.emit(t)


def convert(src):
    c = Conv()
    c.feed(src)
    if c.unknown_hover:
        print('UNKNOWN HOVER:', c.unknown_hover, file=sys.stderr)
    return ''.join(c.out)


if __name__ == '__main__':
    s = open(sys.argv[1], encoding='utf-8').read()
    body = s[s.index('<x-dc>') + 6:s.index('</x-dc>')]
    body = re.sub(r'<helmet>.*?</helmet>', '', body, flags=re.S)
    if len(sys.argv) > 2 and sys.argv[2] == '--main':
        body = body[body.index('</header>') + 9:body.index('<footer')]
    print(convert(body))
