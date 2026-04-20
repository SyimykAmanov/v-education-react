import { useState } from "react"

export default function Categories({categories, activeCategory, onCategoryClick}) { 
    return (
        <div className="categories">
            {categories.map(category => 
                <button key={category} className={`button category-btn ${category === activeCategory ? "active" : ""}`} onClick={() => onCategoryClick(category)}>{category}</button>)
            }
        </div>
    )
}