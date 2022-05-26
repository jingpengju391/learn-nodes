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

```