import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectFilteredContacts } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';

import scss from './UserList.module.scss';

const UserList = ({ children }) => {
  const dispatch = useDispatch();
  const filteredArray = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {children}
      <div>{isLoading && !error && <b>Request in progress...</b>}</div>
      <ul className={scss.list}>
        {filteredArray.map(({ name, phone, id }) => (
          <li className={scss.listItem} key={id}>
            {name}: {phone}
            <button
              className={scss.button}
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

UserList.propTypes = {
  children: PropTypes.element,
};

export default UserList;
