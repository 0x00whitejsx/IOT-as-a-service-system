import React, { useState } from 'react';
import { FaPython, FaJava, FaJsSquare } from 'react-icons/fa';
import Modal from 'react-modal';
import styled from 'styled-components';

// Styled Components for Modal and Cards
const ModalContent = styled.div`
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  max-width: 700px;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 70vh;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
`;

const LanguageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${props => (props.selected ? '#007bff' : '#ccc')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => (props.selected ? '#e6f2ff' : '#f9f9f9')};

  &:hover {
    border-color: #007bff;
  }

  svg {
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${props => (props.selected ? '#007bff' : '#333')};
  }
`;

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const ModalButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.85rem 1.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  background-color: #007bff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-top: 3rem;
  margin-right:14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DownloadButton = styled(Button)`
  background-color: #ffc107;

  &:hover {
    background-color: #e0a800;
  }
`;

const languages = [
  { name: 'Python', icon: <FaPython size={48} /> },
  { name: 'Java', icon: <FaJava size={48} /> },
  { name: 'JavaScript', icon: <FaJsSquare size={48} /> },
  { name: 'C#', icon: <FaJsSquare size={48} /> },
];

function SDK() {
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const openSuccessModal = () => setSuccessModalIsOpen(true);
  const closeSuccessModal = () => setSuccessModalIsOpen(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div style={{ textAlign: 'center'}}>
      <Button onClick={openSuccessModal}>Download SDK</Button>

      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="SDK Download"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          content: { top: '20%', left: '20%', right: '20%', bottom: 'auto' },
        }}
      >
        <ModalContent>
          <h2>Select Your SDK Language</h2>
          <p>Click on your preferred programming language to download the corresponding SDK:</p>

          <LanguageGrid>
            {languages.map((language) => (
              <LanguageCard
                key={language.name}
                selected={selectedLanguage === language.name}
                onClick={() => handleLanguageSelect(language.name)}
              >
                {language.icon}
                <span>{language.name}</span>
              </LanguageCard>
            ))}
          </LanguageGrid>

          {selectedLanguage && (
            <div style={{ marginTop: '1.5rem', fontSize: '1.1rem', color: '#333' }}>
              You selected: <strong>{selectedLanguage}</strong> SDK
            </div>
          )}

          {selectedLanguage && (
           <a
           href={`/downloads/${selectedLanguage.toLowerCase()}-sdk.zip`} // Direct file path
           download={`${selectedLanguage}-SDK.zip`} // Optional: Suggests a file name for the download
           style={{ textDecoration: 'none' }}
         >
              <DownloadButton>Download {selectedLanguage} SDK</DownloadButton>
            </a>
          )}

          <ModalButton onClick={closeSuccessModal}>Close</ModalButton>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SDK;
