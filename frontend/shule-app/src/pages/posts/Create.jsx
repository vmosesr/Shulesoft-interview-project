import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {

    const navigate = useNavigate();

    const[formData, setFormData]  = useState({
        title: '',
        content: '',
        post_category: '',
    });

    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();

        const response = await fetch("/api/posts", {
            method: "post",

            body: JSON.stringify(formData),
        });     

        const data = await response.json();

        if(data.errors){
            setErrors(data.errors); 
        }  else {
            navigate('/');
        }
    }


    return (

        <div className="posts-form">
            <h1>Create new post</h1>
            <form action="" onSubmit={handleCreate}>
                <input type="text" name="title" id="" placeholder="Title" className="posts-title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <textarea name="content" id="" cols="30" rows="10" placeholder="Post content" className="posts-content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}></textarea>
                <select name="post_category" id="" className="posts-category" value={formData.post_category} onChange={(e) => setFormData({...formData, post_category: e.target.value})}>
                    <option value="" selected disabled>Select category</option>
                    <option value="SPORTS">Sports</option>
                    <option value="ECONOMY">Economy</option>
                    <option value="RELIGION">Religion</option>
                </select>
                {errors && <div className="error-messages">{Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}</div>}
                <button type="submit" className="create-btn">Create</button>
            </form>
        </div>

    )
}