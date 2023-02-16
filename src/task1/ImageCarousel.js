import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../api/index";

/** CSS */
import './ImageCarusel.css'

const ImageCarousel = (props) => {
    
    const [imgs, setImgs] = useState([])
    const [currentImgList, setCurrentImgList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [slideSyle, setSlideStyle] = useState({})
    const [imgsLoaded, setImgsLoaded] = useState([])

    const time = 300
    let lastTimeOut = null

    /** Hooks */
    useEffect(()=> {
        const fetchImags = async() => {
            try {
                const res = await fetchImageUrls()
                if(!res.length) throw new Error()

                setImgs(res)
            } catch {
                console.error('Can\'t fetch images')
            }
        }

        fetchImags()
    }, [])

    useEffect(()=> {
        buildCurrentImgList()
    }, [imgs, currentIndex])


    /** Helpers */
    const buildCurrentImgList = () => {
        if(!imgs.length) return []

        const next = currentIndex === imgs.length - 1 ? 0 : currentIndex + 1
        const prev = currentIndex === 0 ? imgs.length - 1 : currentIndex - 1

        const afterNext = next === imgs.length - 1 ? 0 : next + 1
        const beforePrev = prev === 0 ? imgs.length - 1 : prev - 1

        setCurrentImgList( [imgs[beforePrev], imgs[prev], imgs[currentIndex], imgs[next], imgs[afterNext]])
    }

    const addImg = (url) => {
        if(imgsLoaded.includes(url)) return
        
        const duplicate = [].concat(imgsLoaded)
        duplicate.push(url)
        setImgsLoaded(duplicate)
    }

    const slideNext = () => {
        lastTimeOut && clearTimeout(lastTimeOut)

        setSlideStyle({
            opacity: 0,
            transition: `opacity ${time / 2}ms linear`,
        })

        lastTimeOut = setTimeout(()=> {        
            setCurrentIndex(currentIndex ===  imgs.length - 1 ? 0 : currentIndex + 1)

            setSlideStyle({
                opacity: 1,
                transition: `opacity ${time / 2}ms linear`,
            })
        }, time / 2)
    }

    const slidePrev = () => {
        lastTimeOut && clearTimeout(lastTimeOut)

        setSlideStyle({
            opacity: 0,
            transition: `opacity ${time / 2}ms linear`,
        })

        lastTimeOut = setTimeout(()=> {
            setCurrentIndex(currentIndex ===  0 ? imgs.length - 1 : currentIndex - 1)

            setSlideStyle({
                opacity: 1,
                transition: `opacity ${time / 2}ms linear`,
            })
        }, time / 2)
    }


    /** Rendering */
    const renderLoader = () => {
        return (
            <div className="loader">
                <h2>Loading...</h2>
            </div>
        )
    }

    const renderSlider = () => (
        <div className="slider">
            <ul className="slider__inner">
                { currentImgList.map(url => (
                    <li key={ url }
                        className="slider__item" 
                        style={ slideSyle }>
                        { <img className="slider__img" 
                               src={ url } alt="Description..."
                               onLoad={()=> addImg( url )} 
                               style={{ visibility: imgsLoaded.includes(url) ? 'visible' : 'hidden' }} /> }

                        { !imgsLoaded.includes(url) && <p className="loading-img">Loading img...</p> }
                    </li>
                )) }
            </ul>
            <div className="slider__arrows">
                <button className="slider__arrow slider__arrow--prev"
                        onClick={ slidePrev }>{'<'}</button>
                <button className="slider__arrow slider__arrow--next"
                        onClick={ slideNext }>{'>'}</button>
            </div>
        </div>
    )

    return (
        <div className="container">
            { !currentImgList.length && renderLoader() }
            { !!currentImgList.length && renderSlider() }
        </div>
    )
}

export default ImageCarousel;
