//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"


import { makeGroup } from '../../store/group';
import "./CreateGroupForm.css"
import "./CreateEventForm.css"
import { makeEvent } from '../../store/event';

export default function CreateEventForm() {
    const history = useHistory();
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const eventState = useSelector(state => state.events.singleEvent)
    const host = user?.username

    const event = eventState



    const { groupId } = useParams()


    // const { closeModal } = useModal()


    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [group_limit, setGroupLimit] = useState(0)
    const [num_going, setNumGoing] = useState(0)
    const [format, setFormat] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [strangers, setStrangers] = useState(true)
    const [online, setOnline] = useState(true)
    
    // need this?
    const [saved, setSaved] = useState(false)



    const [num_members, setNumMembers] = useState(0)
    // const [img_url, setImgUrl] = useState("")


    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        if (!name) e.name = "Must submit a name"
        if (!details) e.details = "Must submit details"
        if (!format) e.format = "Must submit a format"
        if (!description) e.description = "Must submit a description"
        if (!strangers) e.strangers = "Must submit a value for online"

        if (!date) e.date = "Must submit a date"
        if (date.length !== 10) e.dateLength = "Date must be written in following format, 'mm/dd/yyyy'"


        
        //dont need to require a num going if not known
        //dont need to require a group limit if not known
        //host is taken from user

        // if (!num_members) e.num_members = "Must submit a description"
        // assign defaults to img_url and num_members
    }, [name, details, format, description, strangers, date])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("SUBMITTED")
        setHasSubmitted(true)
        // console.log("ERRORS", errors)
        if (Object.values(errors).length) {
            return
        }
        const newEvent = {
            name,
            details,
            num_going,
            group_limit,
            host,
            format,
            description,
            date,
            strangers,
            //make sure you wire your create event to specific groups
            group_id: groupId,
            saved: false
        }
        const eventResponse = dispatch(makeEvent(newEvent))
        const eventData = await Promise.resolve(eventResponse)
        if (eventData) {
            history.push(`/event-details/${eventData.id}`)
        }

    };


    const handleCheckStrangers = (e) => {
        strangers === true ? setStrangers(false) : setStrangers(true)
    }

    const handleCheckOnline = (e) => {
        online === true ? setOnline(false) : setOnline(true)
    }


    return (
        <div className='cp-container'>
            <h1 className='cp-title form-title'>Create an Event</h1>
            {/* <p className='cp-grey-text sub-q-text form-sub'>Tell the world all about your item and why they'll love it</p> */}
            <form className='sp-form' onSubmit={handleSubmit} >

                <div className='product-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Name
                        </label>
                        <p className='create-shop-grey'>
                            Choose a name for your event
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
                            Start with a brief overview of your event. Feel free to mention details such as membership requirements or ground rules!
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

                <div className='product-description-div'>
                    <div className='description-title-sub-text'>
                        <label className='cp-form-label cp-description q-text' >
                            Details
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Describe your event in detail. This is your chance to be as descriptive as neccessary.
                        </p>
                    </div>
                    <div className='cp-field-div description-text'>
                        <textarea className='product-input input-field description-input' type="text-area"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder='' />
                        {hasSubmitted && errors.details && (
                            <div className='error'>
                                * {errors.details}
                            </div>
                        )}
                    </div>
                </div>

                <div className='product-price-div'>
                    <div >
                        <label className='cp-form-label cp-price q-text' >
                            Number of Members
                        </label>
                        <p className='cp-form-label sub-q-text create-shop-grey'>
                            Please enter how many members have indicated they will attend the event so far. If you don't know how many exactly, feel free to provide an estimate or leave the input 0.
                        </p>
                    </div>
                    <div className='cp-form-field'>
                        <input className='product-input input-field' type="number"
                            value={num_going}
                            onChange={(e) => setNumGoing(e.target.value)}
                            placeholder='Number of attendees' />
                    </div>  
                </div>


                <div className='product-price-div'>
                    <div >
                        <label className='cp-form-label cp-price q-text' >
                            Group Limit
                        </label>
                        <p className='cp-form-label sub-q-text create-shop-grey'>
                            Please enter the maximum number of attendees allowed at the event. If you don't know or have no limit, feel free to leave the input 0.
                        </p>
                    </div>
                    <div className='cp-form-field'>
                        <input className='product-input input-field' type="number"
                            value={group_limit}
                            onChange={(e) => setGroupLimit(e.target.value)}
                            placeholder='Number of attendees' />
                    </div>
                </div>


                <div className='product-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Date
                        </label>
                        <p className='create-shop-grey'>
                            Choose a date for your event
                        </p>
                        {/* <p className='cp-grey-text sub-q-text'>Incldue keywords that buyer would use to search for your item</p> */}
                    </div>
                    <div className='input-div'>
                        <div className='cp-field-div'>
                            <input className='product-input input-field' type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder='mm/dd/yyyy' />
                            {hasSubmitted && errors.date && (
                                <div className='error'>
                                    * {errors.date}
                                </div>
                            )}
                            {hasSubmitted && errors.dateLength && (
                                <div className='error'>
                                    * {errors.dateLength}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                    <div className='product-shipping-div'>
                        <div className='public-q-div'>
                            <label className='product-label q-text' >
                                Public
                            </label>
                            <p className='cp-form-label sub-q-text create-shop-grey check-box-text'>
                                Check the box to indicate whether or not your event is open to anyone or just group members.
                            </p>
                        </div>
                        <div className='cp-field-div public-check-div'>
                            <input className='product-input input-field check-box' type="checkbox"
                                value={strangers}
                                onChange={handleCheckStrangers}
                                placeholder='Description' />
                            {hasSubmitted && errors.strangers && (
                                <div className='error'>
                                    * {errors.strangers}
                                </div>
                            )}
                        </div>
                    </div>

                <div className='product-shipping-div'>
                    <div className='online-div'>
                        <label className='product-label q-text' >
                            Online
                        </label>
                        <p className='cp-form-label sub-q-text create-shop-grey check-box-text'>
                            Check the box to indicate whether or not your event is online or in person.
                        </p>

                    </div>
                    {/* <p className='cp-grey-text'>Either true or false</p> */}
                    <div className='cp-field-div'>
                        <input className='product-input input-field check-box public-check' type="checkbox"
                            value={online}
                            onChange={handleCheckOnline}
                            placeholder='Description' />
                        {hasSubmitted && errors.online && (
                            <div className='error'>
                                * {errors.online}
                            </div>
                        )}
                    </div>
                </div>



                



            </form>
            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type="submit" value="Schedule event" />
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