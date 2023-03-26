import React, { useEffect, useState } from 'react'
import { InputGroup, Button, Form } from 'react-bootstrap'
import './Searchbar.css';
import { instanceAxs } from '../../config/api'
import { Link, useNavigate } from 'react-router-dom';

export default function Searchbar() {
    const [productObjects, setProductObjects] = useState([])
    const [suggestedCategories, setSuggestedCategories] = useState([]);
    const [suggestedSubCategories, setSuggestedSubCategories] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => {
        let input = e.target.value;
        setSearchInput(input)
    }

    const makeSearch =(e) => {
        let url = '/search?q=' + searchInput;
        navigate(url)
    }

    useEffect(() => {
        if(searchInput === '') return;
        instanceAxs.post('/searchproduct', {q: searchInput}).then(response => {
            var responseData = response.data.productArray.map(item => {
                return {title: item.title, img: item.annonceImages[0], id: item._id}
            })
            const suggestedCat = response.data.categories.slice(0,3);
            const suggestedSub = response.data.subCategories.slice(0,3);

            responseData = responseData.slice(0,3)
            setProductObjects(responseData)
            setSuggestedCategories(suggestedCat)
            setSuggestedSubCategories(suggestedSub)
        })        
    }, [searchInput])

  return (
    <div>
        <div className='search-inputs'>
            <InputGroup>
                    <Form.Control className='search-inputs__input' type='text' placeholder='Søk...' onChange={handleInput} style={{width: 250}}></Form.Control>
            <Button style={{width: 80}} type='button' onClick={makeSearch}>Search</Button>
            </InputGroup>
        </div>
        {searchInput !== '' &&

        <div className='search-suggestions'>    
            <div className='suggestion-div'>
                <p className='suggestion-title'>Ordet</p>
                <a href={`/search?q=${searchInput}`}>Finn flere resultater for '{searchInput}'</a>
            </div>

            {productObjects.length > 0 &&       
            <div className='suggestion-div'>
                <p className='suggestion-title'>Produkter</p>
                {productObjects.map(item => {
                    return(
                        <Link to={`/produkt/${item.id}`} key={item.title}>
                            <div className='suggestion-div-produkt' key={item.title}>
                                <p style={{margin: 0}}>{item.title}</p>
                                <img className='suggestion-div-produkt-img' src={item.img} alt="annonce"/>
                            </div>
                        </Link>
                    )
                })}
            </div>
              }

              {suggestedCategories.length > 0 &&
                suggestedCategories.filter(item => item !== null && item !== undefined)
                    .map(item => {
                            return(
                                <div className='suggestion-div' key={item}>
                                    <p className='suggestion-title'>Kategori</p>
                                    <a href={`search?category=${item}`}>{item}</a>
                                </div>
                            )
                    })
              }

            {suggestedSubCategories.length > 0 &&
                    suggestedSubCategories.filter(item => item !== null && item !== undefined).map(item => {
                            return(
                                <div className='suggestion-div' key={item}>
                                    <p className='suggestion-title'>Kategori</p>
                                    <a href={`search?category=${item}`}>{item}</a>
                                </div>
                            )                                             
                    })
              }
              
        </div>     
        }
    </div>
  )
}
