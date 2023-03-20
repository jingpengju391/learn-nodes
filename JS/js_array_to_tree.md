# array to tree
```js

    /**
    * 构造树型结构数据
    * @param {*} data 数据源
    * @param {*} id id字段 默认 'id'
    * @param {*} parentId 父节点字段 默认 'pid'
    * @param {*} children 孩子节点字段 默认 'children'
    * @param {*} rootId 根Id 默认 0
    */
    
    function arraytotree(data, id, parentId, children, rootId){
        id = id || 'id'
        parentId = parentId || 'parentId'
        children = children || 'children'
        rootId = rootId || 0
        return data.filter(father => {
            const children = data.filter(child => father[id] === child[parentId])
            if(children.length > 0) father.children = children
            return father[parentId] === rootId 
        })
    }


/**
 * tree转数组，递归模式
 * @param tree
 * @returns {*[]}
 * @constructor
 */
function TreeToArray(tree) {
    // 判断 tree 是否有值，无返回 []
    if (!Array.isArray(tree) || !tree.length) return []
    let res = []
    tree.forEach(v => {
        // tree的每个元素都 放入到 res里面
        res.push(v)
        if (v.children) {
            // 有children 就把 children数据递归 返回  依次放到 res里面
            res.push(...TreeToArray(v.children))
        }
    })
    return res
}

```