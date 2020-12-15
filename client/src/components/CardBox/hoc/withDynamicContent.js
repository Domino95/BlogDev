import React, { Component } from 'react';

export default function (WithDynamicContent) {
    return class extends Component {
        render() {

            const children = (
                <>
                    <input
                        value={this.props.post.title}
                        onChange={(e) => this.props.handlePost(e)}
                        placeholder="Title"
                        id="title">
                    </input>
                    <textarea
                        value={this.props.post.content}
                        onChange={(e) => this.props.handlePost(e)}
                        id="content"
                        placeholder="Please share with us your knowledge">
                    </textarea>
                    <button onClick={() => this.props.sendPost()}>Create</button>
                </>
            )

            return <WithDynamicContent
                {...this.props}
                children={children}
                CARDBOX_USER={localStorage.getItem('userName')}
                CARDBOX_DATE={new Date().toLocaleDateString()}
                CARDBOX_CATEGORY={this.props.post.category}
                CARDBOX_LEVEL={this.props.post.level}
            />
        }
    }
}