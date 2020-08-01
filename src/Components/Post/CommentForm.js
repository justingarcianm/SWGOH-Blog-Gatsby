import React from 'react'

const CommentForm = () => {
    return (
        <form className="container-fluid pb-2">
            <div className="row">
                <div className="col-md-10 ">
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Enter your comment"/>
                    </div>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-dark">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default CommentForm