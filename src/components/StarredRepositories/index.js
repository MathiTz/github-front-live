import React from 'react';
import { Overlay } from 'react-portal-overlay';

import { FaRegStar } from 'react-icons/fa';

import './styles.css';

const StarredRepositories = (props) => {
  const { isOpen, closeModal, repositories } = props;

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
              <p>
                <span>Name</span>: {repository.name}
              </p>

              <div className="repositories__starred--desc">
                <p>
                  <span>Description</span>: {repository.description}
                </p>

                <div className="starred__count">
                  <div className="stargazers__count">
                    {' '}
                    <FaRegStar size={20} />
                    <span>{repository.stargazers_count}</span>
                  </div>
                  <a
                    onClick={() => {
                      window.open(repository.html_url);
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={repository.html_url}
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
