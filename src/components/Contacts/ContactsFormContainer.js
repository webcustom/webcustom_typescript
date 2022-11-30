import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {postMailThunkCreator} from "../../redux/contacts-reducer";
// import {Field, reduxForm} from "redux-form";
// import {Input} from "../common/FormsControls/FormsControls";
// import {compose} from "redux";
import { useForm } from "react-hook-form";



const ContactsForm = (props) => {

   const dispatch = useDispatch();


   const { register, handleSubmit, watch, formState: { errors }, reset, getFieldState, getValues } = useForm({
      mode: 'onChange',
   });

   const [succesForm, setSuccesForm] = useState(false);

   const onSubmit = (data) => {
      // console.log(data)
      reset()
      dispatch(postMailThunkCreator(data));

      setSuccesForm(true)
   };


   // console.log(errors)
   // if(errors?.yourname || errors?.youremail || errors?.yourmessage){
   //    setSuccesForm(false)
   // }

   // console.log(watch("yourname")); // watch input value by passing the name of it
   // console.log(watch("youremail"));
   // console.log('values', getValues('yourname'))
   // console.log('field state', getFieldState('yourname'))

   // console.log(handleSubmit)


   return <>
         <form className='form_1 _mt40' onSubmit={handleSubmit(onSubmit)}>
            <p className='title_2'>Написать мне</p>

            <input autoComplete='off' className={errors?.yourname ? '_error input_1' : 'input_1'} placeholder='Имя*' {...register("yourname", {required: '"Имя" обязательное поле'})} />
            {errors?.yourname && <p className='error'>{errors.yourname.message}</p>}

            <input autoComplete='off' className={errors?.youremail ? '_error input_1' : 'input_1'} {...register("youremail", {
               required: '"Email" обязательное поле', //true
               pattern: {
                  value: /@/,
                  message: 'Пожалуйста введите валидный email'
               }
            })} placeholder='Email*' />
            {errors?.youremail && <p className='error'>{errors.youremail.message}</p>}

            <textarea className={errors?.yourmessage ? '_error input_1' : 'input_1'} placeholder='Сообщение*' {...register("yourmessage", {required: '"Сообщение" обязательное поле'})}></textarea>
            {errors?.yourmessage && <p className='error'>{errors.yourmessage.message}</p>}


            {succesForm && <p className='succes'>Сообщение отправлено!</p>}

            <div className='bottom'>
               <button className='button_1' onClick={()=>{setSuccesForm(false)}} type="submit">Отправить</button>
               {/*<p className='button_1 _icon' onClick={()=>{reset()}}><svg><use href={svgSprite+"#clear"}/></svg></p>*/}
               <p className='button_1 _icon' onClick={()=>{reset()}}><svg id='clear' viewBox="0 0 1024 1024"><path d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"></path></svg></p>
            </div>
         </form>
   </>
}



// const ContactsFormInner = (props) => {
//    return <div>
//          <form onSubmit={props.handleSubmit}>
//             <Field placeholder={"Имя"} name={'yourname'} component={Input}/>
//             <Field placeholder={"E-mail"} name={'youremail'} component={Input}/>
//             {/*<Field placeholder={"Сообщение"} name='message' component={Textarea}/>*/}
//             <button className={'button_1'}>Отправить</button>
//          </form>
//       </div>
// }
//
// const ContactsReduxForm = reduxForm({
//    form: 'contactsForm' //своего рода уникальный идентификатор формы
// })(ContactsFormInner);



// export default compose()(ContactsFormContainer);
export default ContactsForm;