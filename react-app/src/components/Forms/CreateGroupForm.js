import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"


import { joinGroup, makeGroup } from '../../store/group';
import "./CreateGroupForm.css"

export default function CreateGroupForm() {
    const history = useHistory();
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.session.user)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [num_members, setNumMembers] = useState(0)

    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        if (!name) e.name = "Must submit a name"
        if (name.length > 50) e.nameLength = "Name cannot be greater than 50 characters"
        if (!description) e.description = "Must submit a description"
        // if (!num_members) e.num_members = "Must submit a description"
        // assign defaults to img_url and num_members
    }, [name, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (Object.values(errors).length) {
            return
        }
        const newGroup = {
            name,
            description,
            img_url: "lur",
            organizer: user.username,
            num_members: num_members === 0 ? 1 : num_members,
        }
        const groupResponse = dispatch(makeGroup(newGroup))
        const groupData = await Promise.resolve(groupResponse)
        if (groupData) {
            dispatch(joinGroup(groupData.id))
            history.push(`/`)
        }

        
    };

    return (
        <div className='cp-container'>
            <div className='g-detail-top-background'>
                "
            </div>
            <h1 className='cp-title form-title'></h1>
            <form className='sp-form' onSubmit={handleSubmit} >

                <div className='product-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Name
                        </label>
                        <p className='create-shop-grey'>
                            Choose a name for your group
                        </p>
                    </div>
                    <div className='input-div'>
                        <div className='cp-field-div'>
                            <input className='product-input input-field' type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Title' />
                            {hasSubmitted && errors.name && (
                                <div className='error'>
                                    * {errors.name}
                                </div>
                            )}
                            {hasSubmitted && errors.nameLength && (
                                <div className='error'>
                                    * {errors.nameLength}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div className='product-description-div'>
                    <div className='description-title-sub-text'>
                        <label className='cp-form-label cp-description q-text' >
                            Description
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Start with a brief overview of your group. Feel free to mention details such as membership requirements or ground rules!
                        </p>
                    </div>
                    <div className='cp-field-div description-text'>
                        <textarea className='product-input input-field description-input' type="text-area"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='' />
                        {hasSubmitted && errors.description && (
                            <div className='error'>
                                * {errors.description}
                            </div>
                        )}
                    </div>
                </div>

            </form>
            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type="submit" value="Create group" />
        </div>
    );
}

