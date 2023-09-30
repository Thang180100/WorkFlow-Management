import React, { useState } from 'react';
function Search (props){

    const [keyword, setKeyword] = useState('');

    const onChange = (e) => {
            setKeyword(e.target.name ? e.target.value : keyword)
    }
    const onSearch = () => { 
        props.onSearch(keyword)
    }


  return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
                <input type="text" 
                className="form-control" 
                placeholder="Nhập từ khóa..." 
                name="keyword"
                value={keyword}
                onChange={onChange}
                />
                <span className="input-group-btn">
                    <button 
                        className="btn btn-primary" 
                        type="button"
                        onClick={onSearch}>
                        <span className="fa-solid fa-magnifying-glass mr-5"></span>Tìm
                </button>
                </span>
            </div>
        </div>
  );
}

export default Search;
