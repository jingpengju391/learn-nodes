# Babel 核心 （ 抽象语法树 ）

Babel 其实为一种语法转发为另一种语法的过程

1. 语法解析：处理字符串转化为token数组
2. 词法解析：将token数组转化为token tree，也就是抽象语法树（ AST ）
3. 代码转换：将当前AST转化为目标AST
4. 生成代码