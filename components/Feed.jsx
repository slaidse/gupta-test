'use client';

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({ data, handleTagClick }) => {

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState ([])

  //Search States//
  const [searchText, setSearchText] = useState("")
  const [searchedPosts, setSearchedPosts] = useState([])

  function handleSearchChange (event) {
    setSearchText(event.target.value)
    const searchResult = filterPrompts(event.target.value)
    setSearchedPosts(searchResult)
  }

  function handleTagClick (tag) {
    setSearchText(tag)
    const searchResult = filterPrompts(tag)
    setSearchedPosts(searchResult)
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json();
    setAllPosts(data)
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    )
  }
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type = "text" placeholder='Search for a tag or username' value = {searchText} required onChange = {handleSearchChange} className='search_input peer'/>
        
      </form>
    
     
    {searchText ? (<PromptCardList data = {searchedPosts} handleTagClick = {handleTagClick} />) : <PromptCardList data={allPosts} handleTagClick={handleTagClick} />}
    
    </section>
  )
}

export default Feed