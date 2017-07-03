import React from 'react';

export default ({ filters, value, onChange }) => {
    return (
        <div>
            {filters.map((animal, index) => (
                <label key={index}>
                    {animal}
                    <input type="checkbox" 
                        value={value} 
                        onChange={onChange}  />
                </label>
                )
            )}
        </div>
    );
}