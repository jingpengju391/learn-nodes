# diff

```js
    function getDiff(a, b) {
        return [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce((r, k) => {
            
            if (a[k] && b[k] && typeof a[k] === 'object' && typeof b[k] === 'object') {
                var temp = getDiff(a[k], b[k]);
                if (temp.length) r.push(...temp.map(([l, ...a]) => [k + ' ' + l, ...a]));
                return r;
            }
    
            if (k in a && !(k in b)) {
                r.push([k, 'deleted', a[k]]);
                return r;
            }
    
            if (!(k in a) && k in b) {
                r.push([k, 'created', b[k]]);
                return r;
            }
    
            if (a[k] === b[k]) return r;
    
            r.push([k, 'changed', a[k], b[k]]);
            return r;
        }, []);
    }
```
