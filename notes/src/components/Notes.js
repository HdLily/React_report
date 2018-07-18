import React, {Component} from 'react';
import Note from './Note'

class Notes extends Component {
    // state vue data
    state = {
        entities: [
            '邪不压正 如何?',
            '我不是药神, 印度什么药都有'
        ] // entities.length = 0 输出
    }
    createEntry () {

        console.log(this.state.entities);
    }
    destoryEntity (entity) {
        console.log(entity)
    }
    render () {
        // react 独有的JSX 模板引擎
        // 在js 里直接写html
        // react className
        // html-> js node 是会被编译成为js的 class 是一个关键字
        const entities = this.state.entities;
        const noteItems = entities.map((entity, index) => {
        //    return  <li key={index}>{entity}</li>
            return <Note key={index} entity={entity} destoryEntity={this.destoryEntity} />
        })
        
        return (
            <div className="ui container notes">
               <h4 className="ui horizontal divider header">
                    <i className="paw icon"></i>
                    Notes App _ React.js
               </h4>
               <button className="ui right floated basic violet button" onClick={this.createEntry.bind(this)}>
                 添加笔记
               </button>
               <div className="ui divided items">
               {noteItems}
               { !this.state.entities.length && <span className="ui small disabled header">还没有笔记，请先添加</span> }
              
                  
               </div>
            </div>
        )
    }
}

export default Notes;