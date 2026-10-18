# Agrega continuaciones al final de líneas existentes en openings.ts.
# Uso: python3 scripts/extend.py archivo_con_EXT.py
import re, sys, runpy
ext = runpy.run_path(sys.argv[1])['EXT']
p = 'src/data/openings.ts'
s = open(p).read()
for name, more in ext.items():
    pat = re.compile(r"(\{ name: '" + re.escape(name) + r"', moves: (?:`[^`]*|'[^']*))([`'])")
    m = pat.search(s)
    if not m:
        print('NO ENCONTRADA:', name); continue
    s = s[:m.end(1)] + ' ' + more.strip() + s[m.end(1):]
open(p, 'w').write(s)
print('ok', len(ext))
