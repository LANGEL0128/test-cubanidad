import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Parser } from 'html-to-react';

export const Questions = ({questions}) => {

    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [questionsx, setQuestionsx] = useState(questions)
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [isFinish, setIsFinish] = useState(false);

    useEffect(() => {
        if(currentQuestion.selectedAnswer == null) {
            document.getElementById('resp_1').checked = false;
            document.getElementById('resp_2').checked = false;
            document.getElementById('resp_3').checked = false;
            document.getElementById('resp_4').checked = false;
        } 
        if(indexQuestion >= 19) {
            document.getElementById('buttonFinish').style.display = 'block';
        } else {
            document.getElementById('buttonFinish').style.display = 'none';
            document.getElementById('buttonFinish').style.display = 'none';
            document.getElementById('buttonFinish').style.display = 'none';
        }
    });

    useEffect(() => {
        if (currentQuestion.resp_1 === currentQuestion.selectedAnswer) {
            document.getElementById('resp_1').checked = true;
        } else if (currentQuestion.resp_2 === currentQuestion.selectedAnswer) {
            document.getElementById('resp_2').checked = true;
        } else if (currentQuestion.resp_3 === currentQuestion.selectedAnswer) {
            document.getElementById('resp_3').checked = true;
        } else if (currentQuestion.resp_4 === currentQuestion.selectedAnswer) {
            document.getElementById('resp_4').checked = true;
        }
    }, [currentQuestion]);

    const nextQuestion = () => {
        const currentIndex = questionsx.findIndex(obj => obj.question == currentQuestion.question);
        const nextIndex = (currentIndex + 1);
        if(nextIndex < questionsx.length && (
            document.getElementById('resp_1').checked ||  
            document.getElementById('resp_2').checked ||  
            document.getElementById('resp_3').checked ||  
            document.getElementById('resp_4').checked  )) {
            setIndexQuestion(nextIndex)
            setIsFinish(false)
            setCurrentQuestion(questionsx[nextIndex]);
        } else if(
                !document.getElementById('resp_1').checked &&  
                !document.getElementById('resp_2').checked &&  
                !document.getElementById('resp_3').checked && 
                !document.getElementById('resp_4').checked
        ) {
            toast.error('Debe seleccionar alguna respuesta para continuar')
        }
    };

    // const backQuestion = () => {
    //     const currentIndex = questionsx.findIndex(obj => obj.question == currentQuestion.question);
    //     const nextIndex = (currentIndex - 1);
    //     if(nextIndex >= 0) {
    //         setIndexQuestion(nextIndex)
    //         setIsFinish(false)
    //         setCurrentQuestion(questionsx[nextIndex]);
    //     }
    // }

    const handleChange = ({ target }) => {
        const currentIndex = questionsx.findIndex(obj => obj.question == currentQuestion.question);
        questionsx[currentIndex].selectedAnswer = target.value;
        setQuestionsx(questionsx);
    }

    const verifyQuestion = () => {
        if(
            !document.getElementById('resp_1').checked &&  
            !document.getElementById('resp_2').checked &&  
            !document.getElementById('resp_3').checked && 
            !document.getElementById('resp_4').checked
        ) {
            toast.error('Debe seleccionar alguna respuesta para continuar');
        }else {
            toast.success('Genial!! Has finalizado el test de cubanidad.');
            let cantAnswerCorrect = 0;
            questionsx.map((question) => {
                if(question.selectedAnswer == question.correctAnswer)
                    cantAnswerCorrect++;
            });
            setCorrectAnswer(cantAnswerCorrect);
            setIsFinish(true)
        }
    }

    return (
        <div className='py-3'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <p>Pregunta { indexQuestion+1 } / 20 </p>
            <h3>{ currentQuestion.question }</h3>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="resp" 
                    id="resp_1" 
                    onChange={handleChange} 
                    value={ currentQuestion.resp_1 } 
                />
                <label className="form-check-label" htmlFor="resp_1">
                    { currentQuestion.resp_1 }
                </label>
            </div>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="resp" 
                    id="resp_2" 
                    onChange={handleChange} 
                    value={ currentQuestion.resp_2 } 
                />
                <label className="form-check-label" htmlFor="resp_2">
                    { currentQuestion.resp_2 }
                </label>
            </div>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="resp" 
                    id="resp_3" 
                    onChange={handleChange} value={ currentQuestion.resp_3 } 
                />
                <label className="form-check-label" htmlFor="resp_3">
                    { currentQuestion.resp_3 }
                </label>
            </div>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="resp" 
                    id="resp_4" 
                    onChange={handleChange} 
                    value={ currentQuestion.resp_4 } 
                />
                <label className="form-check-label" htmlFor="resp_4">
                    { currentQuestion.resp_4 }
                </label>
            </div>
            <button onClick={ nextQuestion } className="btn btn-primary mt-3 mx-2">Siguiente</button>
            <button onClick={ verifyQuestion } id='buttonFinish' className="btn btn-success mt-3 mx-2">Finalizar</button>
            { isFinish ? Parser().parse('<div>'+
                '<hr />'+
                '<h3>Respuestas Correctas</h3>'+
                '<p>Has respondido un total de '+ correctAnswer +' preguntas correctamente.</p>'+
            '</div>') : null }
        </div>
    )
}
