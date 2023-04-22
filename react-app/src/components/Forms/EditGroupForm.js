//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"


import { fetchOneGroup, editGroup } from '../../store/group';
import "./CreateGroupForm.css"

export default function EditGroupForm() {
    const history = useHistory();
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const groupState = useSelector(state => state.groups.singleGroup)

    const group = groupState


    const { groupId } = useParams()


    // const { closeModal } = useModal()


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [num_members, setNumMembers] = useState(0)
    // const [img_url, setImgUrl] = useState("")


    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        if (!name) e.name = "Must submit a name"
        if (!description) e.description = "Must submit a description"
        // if (!num_members) e.num_members = "Must submit a description"
        // assign defaults to img_url and num_members
    }, [name, description])


    useEffect(() => {
        dispatch(fetchOneGroup(groupId))
    }, [dispatch, groupId])

    // prepopulate form
    useEffect(() => {
        setName(groupState?.name || "")
        setDescription(groupState?.description || "")
        setNumMembers(groupState?.num_members || 1)
    }, [groupState])

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (Object.values(errors).length) {
            return
        }
        const editedGroup = {
            name,
            description,
            img_url: "healer_url@supports.com/medic.png",
            organizer: user.username,
            num_members: num_members === 0 ? 1 : num_members + 1
        }
        dispatch(editGroup(editedGroup, groupId))
        dispatch(fetchOneGroup(groupId))
        reset()
        history.push(`/group-details/${groupId}`)
    };

    const reset = () => {
        setName("")
        setDescription("")
        setNumMembers(0)
    }


    if (!Object.values(group).length) return null

    return (
        <div className='cp-container'>
            <h1 className='cp-title form-title'>Edit a Group</h1>
            {/* <p className='cp-grey-text sub-q-text form-sub'>Tell the world all about your item and why they'll love it</p> */}
            <form className='sp-form' onSubmit={handleSubmit} >

                <div className='product-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Name
                        </label>
                        <p className='create-shop-grey'>
                            Choose a name for your group
                        </p>
                        {/* <p className='cp-grey-text sub-q-text'>Incldue keywords that buyer would use to search for your item</p> */}
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
                        {/* <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Not sure what else to say? Shoppers also like hearing about your process, and the story behind the item!
                        </p> */}
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

                <div className='product-price-div'>
                    <div >
                        <label className='cp-form-label cp-price q-text' >
                            Number of members
                        </label>
                        <p className='cp-form-label sub-q-text create-shop-grey'>
                            Please enter how many other members are in the group.
                        </p>
                    </div>
                    <div className='cp-form-field'>
                        <input className='proudct-input input-field' type="number"
                            value={num_members}
                            onChange={(e) => setNumMembers(e.target.value)}
                            placeholder='Number of members' />
                    </div>
                </div>
            </form>

            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type="submit" value="Edit group" />

        </div>
    );
}


export const urlCheck = (url) => {
    return url.endsWith("jpeg") ||
        url.endsWith("jpg") ||
        url.endsWith("svg") ||
        url.endsWith("png") ||
        url.endsWith('gif') ||
        url.endsWith("bmp")
}
