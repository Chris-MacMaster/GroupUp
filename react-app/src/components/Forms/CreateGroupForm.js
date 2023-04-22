//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"


import { makeGroup } from '../../store/group';
import "./CreateGroupForm.css"

export default function CreateGroupForm() {
    const history = useHistory();
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.session.user)


    const { groupId } = useParams()


    // const { closeModal } = useModal()


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [img_url, setImgUrl] = useState("")
    const [organizer, setOranizer] = useState("")
    const [num_members, setNumMembers] = useState(0)


    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        if (!name) e.name = "Must submit a name"
        if (!description) e.description = "Must submit a description"
        if (!organizer) e.organizer = "Must submit an organizer"
        // assign defaults to img_url and num_members
    }, [name, description, organizer])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("SUBMITTED")
        setHasSubmitted(true)
        // console.log("ERRORS", errors)
        if (Object.values(errors).length) {
            return
        }
        const newGroup = {
            name,
            description,
            img_url: "healer_url@supports.com/medic.png",
            organizer: user.username,
            num_members: num_members === 0 ? 1 : num_members,
        }
        dispatch(makeGroup(newGroup))
        history.push(`/group-details/${groupId}`)
    };


    const handleCheck = (e) => {
        // freeShipping === true ? setFreeShipping(false) : setFreeShipping(true)
    }


    return (
        <div className='cp-container'>
            <h1 className='cp-title form-title'>Group details</h1>
            {/* <p className='cp-grey-text sub-q-text form-sub'>Tell the world all about your item and why they'll love it</p> */}
            <form className='sp-form' onSubmit={handleSubmit} >

                <div className='group-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Title
                        </label>
                        <p className='create-shop-grey'>
                            Choose a name for your group
                        </p>
                        {/* <p className='cp-grey-text sub-q-text'>Incldue keywords that buyer would use to search for your item</p> */}
                    </div>
                    <div className='input-div'>
                        <div className='cp-field-div'>
                            <input className='group-input input-field' type="text"
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

                <div className='group-description-div'>
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
                        <textarea className='group-input input-field description-input' type="text-area"
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



                <div className='group-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Title
                        </label>
                        <p className='create-shop-grey'>
                            Choose a name for your group
                        </p>
                        {/* <p className='cp-grey-text sub-q-text'>Incldue keywords that buyer would use to search for your item</p> */}
                    </div>
                    <div className='input-div'>
                        <div className='cp-field-div'>
                            <input className='group-input input-field' type="text"
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


                <div className='group-available-div'>
                    <div >
                        <label className='cp-form-label cp-available q-text' >
                            Available
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            How many do you currently have in stock?
                        </p>
                    </div>
                    <div className='cp-field-div'>
                        <input className='group-input input-field' type="number"
                            value={available}
                            onChange={(e) => setAvailable(e.target.value)}
                            placeholder='Available' />
                        {hasSubmitted && errors.available && (
                            <div className='error'>
                                * {errors.available}
                            </div>
                        )}
                    </div>
                </div>

                <div className='group-price-div'>
                    <div >
                        <label className='cp-form-label cp-price q-text' >
                            Price
                        </label>
                        <p className='cp-form-label sub-q-text create-shop-grey'>
                            Please dont use denominations other than Empire or New Republic Credits
                        </p>
                    </div>
                    <div className='cp-form-field'>
                        <input className='group-input input-field' type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price' />
                        {hasSubmitted && errors.price && (
                            <div className='error'>
                                * {errors.price}
                            </div>
                        )}
                    </div>
                </div>

                <div className='category-shipping-div'>
                    <div className='group-category-div'>
                        <div >
                            <label className='group-label q-text' >
                                Category
                            </label>
                            <p className='cp-grey-text sub-q-text create-shop-grey'>Select a category from the options below.</p>
                        </div>
                        <div className='cp-field-div'>
                            <select className='group-category-select' name='category' onChange={(e) => setCategory(e.target.value)}>
                                <option value='' >--Please choose a category--</option>
                                <option value='Accessories' >Accessories</option>
                                <option value='Apparel' >Apparel</option>
                                <option value='Collectibles' >Collectibles</option>
                                <option value='Food' >Food</option>
                                <option value='Home Decor' >Home Decor</option>
                                <option value='Jewelry' >Jewelry</option>
                                <option value='Lighting' >Lighting</option>
                                <option value='Wall Art' >Wall Art</option>
                            </select>
                            {hasSubmitted && errors.category && (
                                <div className='error'>
                                    * {errors.category}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='shipping-img-div'>
                        <div className='group-shipping-div'>
                            <label className='group-label q-text' >
                                Free Shipping
                            </label>
                            <p className='cp-form-label sub-q-text create-shop-grey check-box-text'>
                                Check the box to indicate whether or not your group is shipped for free.
                            </p>
                            {/* <p className='cp-grey-text'>Either true or false</p> */}
                            <div className='cp-field-div'>
                                <input className='group-input input-field check-box' type="checkbox"
                                    value={freeShipping}
                                    onChange={handleCheck}
                                    placeholder='Description' />
                                {hasSubmitted && errors.freeShipping && (
                                    <div className='error'>
                                        * {errors.freeShipping}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                </div>
                {/* <div className='group-img1-div'>
                    <div >
                        <label className='group-label q-text' >
                            Image URL
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Provide a url, pictures are necessary! Nobody wants to buy something sight unseen!
                        </p>
                    </div>
                    <input className='group-input input-field' type="text"
                        value={img_url}
                        onChange={(e) => setImgUrl(e.target.value)}
                        placeholder='URL' />
                    {hasSubmitted && errors.img_url && (
                        <div className='error'>
                            * {errors.img_url}
                        </div>
                    )}
                </div>
                {hasSubmitted && errors.urlCheck && (
                    <div className='error'>
                        * {errors.urlCheck}
                    </div>
                )} */}


            </form>

            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-group-button' type="submit" value="Create group" />

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
