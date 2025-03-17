import { useDispatch, useSelector } from 'react-redux'
import {filterChange} from '../reducers/filterReducer.js'

const VisibilityFilter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(s => s.filter )
    const changeVisibility = (value) => dispatch(filterChange(value))

    return (
        <div>
            All
            <input
                type="radio"
                name="filter"
                onChange={() => changeVisibility('ALL')}
                checked={filter === 'ALL'}
            />
            Important
            <input
                type="radio"
                name="filter"
                onChange={() => changeVisibility('IMPORTANT')}
                checked={filter === 'IMPORTANT'}
            />
            Non important
            <input
                type="radio"
                name="filter"
                onChange={() => changeVisibility('NONIMPORTANT')}
                checked={filter==='NONIMPORTANT'}
            />
        </div>

    )
}

export default VisibilityFilter