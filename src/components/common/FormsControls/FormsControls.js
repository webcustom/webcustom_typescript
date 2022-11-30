import React from 'react';
import styles from './FormsControls.module.sass';
import {Field, reduxForm} from "redux-form";

//{input, meta, child, ...props}; - эта запись нам говорит о том, что  мы занесем в переменные input, meta, child значения нашего объекта, а все остальное закинем в props это называется деструктуризация (...props так обозначаются остаточные параметры в деструктуризации)
const FormControl = ({input, meta, child, ...props}) => {
   const hasError = meta.touched && meta.error; //выносим наше условие в переменную (если input был затронут и meta = error)
   // debugger;
   return (
      <div className={styles.form_control + " " + (hasError ? styles.error : "")}> {/*если условие выполняется выводим класс error*/}
         {/*тут мы отдельно передаем input и props десткруктуризацией*/}
         <div>
            {/*textarea или input который мы поместили внуть FormControl*/}
            {props.children}
         </div>
         {/*если элемент был затрону (в фокусе) и у meta есть error тогда выводим span*/}
         { hasError && <span>{meta.error}</span>}
      </div>
   )
}


//FormControl для textarea

// в props к нам приходит объект с данными из того места в котором вызывется наш компонент чтобы исключить ненужные данные из props мы делаем следующее
//{input, meta, child, ...props} = props; - эта запись нам говорит о том, что  мы занесем в переменные input, meta, child значения нашего объекта, а все остальное закинем в props это называется деструктуризация
export const Textarea = (props) => {
   const {input, meta, child, ...restProps} = props; //тут мы вновь из пропсов исключаем input, meta, child и называем остаточные пропсы restProps
   // debugger;
   return (
      // textarea которую мы поместили внуть FormControl в дальнейшем получаем в самой FormControl в виде props.children
      <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
   )
}


export const Input = (props) => {
   const {input, meta, child, ...restProps} = props;
   // debugger;
   return (
      <FormControl {...props}><input {...input} {...restProps}/></FormControl>
   )
}
//{...input} то же самое что и  (input = {input}) {...restProps} - таким образом мы передаем и сразу деструктуризируем данные и из ранее дистркутуризированной переменной input и также ранее дестр-ой restProps



export const createField = (placeholder, name, validators, component, props={}, text="") => (
   <div>
      <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} />{text}
   </div>
)
