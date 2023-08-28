import { type } from '@testing-library/user-event/dist/type';
import React,{createContext, useContext, useState} from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com/search'

export const ResultContextProvider = ({children}) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Himanshu');
    // /videos, /search, /images
    const getResults = async (url) => {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}${type}`,{
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search72.p.rapidapi.com',
                'x-rapidapi-key': '8291a2b844msh7c360af0929e9fep164308jsne90251b0e1bf',
            }
        });
        const data = await response.json();
        console.log({type,data});
        
        if(type.includes('/news')){
            setResults(data.entries);
        }else if(type.includes('/images')){
            setResults(data.image_results);
        }else{
            setResults(data.results);
        }

        setIsLoading(false);
    }
    return(
        <ResultContext.Provider value={{getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    );
}
export const useResultContext = () => useContext(ResultContext);