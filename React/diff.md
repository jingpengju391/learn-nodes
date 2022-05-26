# diff

### dom渲染过程

- 当状态的数据发生变化时，react会根据新的数据生成新的虚拟dom，随后根据新旧虚拟dom进行diff对比，最后用比较后的虚拟dom生成真实的dom

### diff 的对比规则

1. 新旧虚拟dom中有key值相同的
- 内容变化了，生成新的真实dom并替换旧的dom
- 内容没有变化了，使用旧的虚拟dom并不生成新dom

2. 新旧虚拟dom中没有key值相同的
- 根据数据生成新的真实dom，渲染到页面

### index下标作为key可能会引发的问题

- #### 可能会引发效率低下


    逆序添加，逆序删除等导致下标顺序改变的操作，极大可能会使循环中的所有dom都重新生成并渲染（极少情况在顺序错乱的情况下对应key的dom内容仍然没有发生变化，那也就不会更新dom）

##### 例：

```react
class Dom extends React.Component{
    state = {
        reports: [
            {
                name: '小明',
                totalScore: 400
            },
            {
                name: '小李',
                totalScore: 500
            }
        ]
    }

    addReport = () => {
        const { reports } = this.state
        const newReports = {
            name: '小张',
            totalScore: 300
        }

        this.setState(reports:[newReports,...reports])
    }

    render(){
        const { reports } = this.state
        return (
            <div>
                <h2>期末成绩单</h2>
                <button onClick={this.addReport}>添加成绩</button>
                <ul>
                    reports.map((report,index) => {
                        return <li key={index}>{report.name} ---- {report.totalScore}</li>
                    })
                </ul>
            </div>
        )
    }
}
```

- #### 页面显示出现bug


    在循环结构中包括输入类的dom时，如果首先操作输入后在进使行下标顺序改变的改变状态数据操作，会产生页面显示bug

##### 例：

```react
class Dom extends React.Component{
    state = {
        reports: [
            {
                name: '小明',
                totalScore: 400
            },
            {
                name: '小李',
                totalScore: 500
            }
        ]
    }

    addReport = () => {
        const { reports } = this.state
        const newReports = {
            name: '小张',
            totalScore: 300
        }

        this.setState(reports:[newReports,...reports])
    }

    render(){
        const { reports } = this.state
        return (
            <div>
                <h2>期末成绩单</h2>
                <button onClick={this.addReport}>添加成绩</button>
                <ul>
                    reports.map((report,index) => {
                        return  <li key={index}>
                                    {report.name} ---- {report.totalScore}
                                    <input type="text" />
                                </li>
                    })
                </ul>
            </div>
        )
    }
}
```

