import React, {useState, useEffect} from 'react'
import { db } from '../firebase';
import { toast } from "react-toastify";


const LinkForm = (props) => {

    const initialStatevalues = {
        url: '',
        name: '',
        description: ''
    }

    const [values, setValues] = useState(initialStatevalues);

    const handleInput = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }

    const validURL = str => {
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
              "(\\#[-a-z\\d_]*)?$",
            "i"
          ); // fragment locator
          return !!pattern.test(str);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        if (!validURL(values.url)) {
            return toast("invalid url", { type: "warning", autoClose: 1000 });
        }

        props.addOrEditLink(values);
        setValues({...initialStatevalues})
    }

    const getLinkById = async id => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        if(props.currentId === ''){
            setValues({...initialStatevalues})
        } else {
            getLinkById(props.currentId)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId])

    return(
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group mb-2">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="https://url.com"
                    name="url"
                    onChange={handleInput}
                    value={values.url}
                />
            </div>

            <div className="form-group input-group mb-2">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Website name"
                    onChange={handleInput}
                    value={values.name}
                />
            </div>

            <div className="form-group">
                <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Write a description"
                    onChange={handleInput}
                    value={values.description}
                    ></textarea>
            </div>

            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    )
}

export default LinkForm;