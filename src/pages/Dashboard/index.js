import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';

import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';
import Location from '../../components/Location';
import useToggle from '../../hook/toggle';
import StarredRepositories from '../../components/StarredRepositories';

function Dashboard() {
  const [values, setValues] = useState({});
  const [location, setLocation] = useState([]);
  const [users, setUsers] = useState(() => {
    const userJSON = localStorage.getItem('@users');

    const users = JSON.parse(userJSON);

    if (userJSON) {
      return users;
    } else {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [modalToggle, setModalToggle] = useToggle(false);
  const [modalToggleRepo, setModalToggleRepo] = useToggle(false);

  const geolocation = navigator.geolocation;

  useEffect(() => {
    if (geolocation) {
      geolocation.getCurrentPosition((position) => {
        const { coords } = position;

        setLocation([coords.latitude, coords.longitude]);
      });
    }
  }, [geolocation]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const { data } = await api.get(`/users/${values['user']}`);

        const { id, avatar_url, login, bio, html_url } = data;

        const findUser = users.find((user) => user.id === id);

        if (findUser) {
          alert('User already in list');
          setLoading(false);
          return;
        }

        const user = {
          id,
          login,
          avatar_url,
          bio,
          html_url,
          location,
        };

        setUsers([...users, user]);

        localStorage.setItem('@users', JSON.stringify([...users, user]));

        setLoading(false);
      } catch (err) {
        alert('Sorry, we couldnt find the user');
        setLoading(false);
      }
    },
    [values, users, location]
  );

  const handleOnChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setValues({
        ...values,
        [name]: value,
      });
    },
    [values]
  );

  return (
    <>
      <h1 className="dashboard__title">Front - Live</h1>

      <form id="dashboard__form" onSubmit={handleSubmit}>
        <input
          className="dashboard__input"
          name="user"
          onChange={handleOnChange}
        />

        <button className="dashboard__button" type="submit">
          {loading ? <FaSpinner size={20} color="#ff9000" /> : 'Search user'}
        </button>
      </form>

      <section className="user__box--wraper">
        {users &&
          users.map((user) => (
            <main key={user.id} className="user__box">
              <div className="user__box--profile">
                <h3>{user.login}</h3>
                <img src={user.avatar_url} alt={user.login} />
              </div>
              <div className="user__box--desc">
                <p>{user.bio}</p>
                <section className="user__box--outlinks">
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={user.html_url}
                  >
                    Profile
                  </a>
                  <button type="button" onClick={setModalToggle}>
                    Location
                  </button>
                  <button type="button" onClick={setModalToggleRepo}>
                    Starred Repo
                  </button>
                </section>
              </div>
              <Location
                location={user.location}
                isOpen={modalToggle}
                closeModal={setModalToggle}
              />
              <StarredRepositories
                isOpen={modalToggleRepo}
                closeModal={setModalToggleRepo}
                repositoriesStarred={user.login}
              />
            </main>
          ))}
      </section>
    </>
  );
}

export default Dashboard;
