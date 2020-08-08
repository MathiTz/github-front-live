import React, { useState, useEffect } from 'react';
import { Overlay } from 'react-portal-overlay';
import api from '../../services/api';

import { FaRegStar } from 'react-icons/fa';

import './styles.css';

const StarredRepositories = (props) => {
  const { isOpen, closeModal, repositoriesStarred } = props;

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepo() {
      const { data } = await api.get(`users/${repositoriesStarred}/starred`);

      setRepositories(data);
    }

    loadRepo();
  }, [repositoriesStarred]);
  console.log(repositories);
  return (
    <Overlay
      open={isOpen}
      onClose={closeModal}
      closeOnClick
      className="modal__wrapper"
    >
      <div className="modal__wrapper--body">
        {repositories &&
          repositories.map((repository) => (
            <main key={repository.id} className="repositories__starred">
              <p>Name: {repository.name}</p>

              <div className="repositories__starred--desc">
                <p>Description: {repository.description}</p>

                <div className="starred__count">
                  <div className="stargazers__count">
                    {' '}
                    <FaRegStar size={20} />
                    <span>{repository.stargazers_count}</span>
                  </div>
                  <a
                    href={repository.html_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Github Page
                  </a>
                </div>
              </div>
            </main>
          ))}
      </div>
    </Overlay>
  );
};

export default StarredRepositories;
