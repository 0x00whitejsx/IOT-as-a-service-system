import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import SDK from './SDK';
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2.5rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 2rem;
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const CTASection = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const CTAButton = styled.a`
  padding: 1rem 2rem;
  font-size: 1.25rem;
  color: white;
  background-color: #28a745;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #218838;
  }
`;

const Form = styled.div`
  margin-top: 2rem;
  text-align: left;
  background-color: #f5f5f5;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #333;
`;

const IconLabel = styled.span`
  margin-right: 10px;
  font-size: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const GenerateButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.85rem 1.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 70vh;
  
  /* Hide scrollbar but keep scrolling functional */
  ::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  scrollbar-width: none; /* For Firefox */
  
  /* Smooth scrolling */
  scroll-behavior: smooth;
`;

const ModalButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.85rem 1.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;
const regions = [
    'North America',
    'South America',
    'Europe',
    'Asia',
    'Africa',
    'Australia'
  ];
  const firmwareVersions = [
    '1.0.0',
    '1.1.0',
    '1.2.0',
    '2.0.0'
  ];

Modal.setAppElement('#root');

function API_Integration() {
  const [keys, setKeys] = useState({
    publicKey: '',
    privateKey: '',
    secretKey: '',
    terminalNumber: ''
  });
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const generateKeys = () => {
    const randomString = () => Math.random().toString(36).substr(2, 12).toUpperCase();
    
    setKeys({
      publicKey: randomString(),
      privateKey: randomString(),
      secretKey: randomString(),
      terminalNumber: `TERM-${Math.floor(1000 + Math.random() * 9000)}`
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openSuccessModal = () => {
    setSuccessModalIsOpen(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    openSuccessModal();
  };

  return (
    <Container>
      {/* Header Section */}
      <Title>API Integration for IoT Solutions</Title>
      <Description>
        Seamlessly integrate our cutting-edge IoT services with your application using our API and SDKs. 
        Scale your business with powerful and reliable APIs designed for speed, security, and performance.
      </Description>

      {/* Features Section */}
      <Grid>
        <Card>
          <Icon>📥</Icon>
          <CardTitle>SDK Downloads</CardTitle>
          <CardDescription>
            Our SDKs are available for various platforms to help you get started quickly with our IoT services.
          </CardDescription>
          {/* <Button href="/downloads/sdk" onClick={openSuccessModal}>Download SDK</Button> */}
          <SDK />
          {/* <HEADER>bUILDING INTERGRATED SYSTEM WITH IOT</HEADER> */}
        </Card>

        <Card>
          <Icon>📄</Icon>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Explore our comprehensive API documentation to understand how to integrate with our IoT platform.
          </CardDescription>
          <Button href="/Documnet">View API Docs</Button>
        </Card>

        <Card>
          <Icon>🔗</Icon>
          <CardTitle>IoT & Terminal Integration</CardTitle>
          <CardDescription>
            Integrate our IoT services with different terminals and devices for real-time data collection and analysis.
          </CardDescription>
          <Button onClick={openModal}>Start Integration</Button>
        </Card>
      </Grid>

      {/* Key Generation Form */}
      <Form>
        <h3>Generate API Keys & Terminal Number</h3>
        <Label>
          <IconLabel>🔑</IconLabel> Public Key
        </Label>
        <Input type="text" value={keys.publicKey} readOnly />
        
        <Label>
          <IconLabel>🔒</IconLabel> Private Key
        </Label>
        <Input type="text" value={keys.privateKey} readOnly />

        <Label>
          <IconLabel>🗝️</IconLabel> Secret Key
        </Label>
        <Input type="text" value={keys.secretKey} readOnly />

        <Label>
          <IconLabel>📟</IconLabel> Terminal Number
        </Label>
        <Input type="text" value={keys.terminalNumber} readOnly />

        <GenerateButton onClick={generateKeys}>Generate Keys</GenerateButton>
      </Form>

      {/* IoT & Terminal Integration Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="IoT & Terminal Integration"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          content: { top: '10%', left: '10%', right: '10%', bottom: 'auto' }
        }}
      >
        <ModalContent>
          <h2>IoT & Terminal Integration</h2>
          <form onSubmit={handleSubmit}>
            <Label>Terminal Name</Label>
            <Input type="text" required />

            <Label>Device ID</Label>
            <Input type="text" required />

            <Label>
              <IconLabel>🌍</IconLabel> Region
            </Label>
            <Select>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </Select>

            <Label>API Key</Label>
            <Input type="text" value={keys.publicKey} readOnly />

            <Label>Secret Key</Label>
            <Input type="text" value={keys.secretKey} readOnly />

            <Label>Terminal Type</Label>
            <Select required>
              <option value="POS">POS</option>
              <option value="Kiosk">Kiosk</option>
              <option value="Sensor">Sensor</option>
            </Select>

            <Label>
              <IconLabel>🔢</IconLabel> Firmware Version
            </Label>
            <Select>
              {firmwareVersions.map(version => (
                <option key={version} value={version}>{version}</option>
              ))}
            </Select>

            <ModalButton type="submit">Submit & Close</ModalButton>
          </form>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Integration Success"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          content: { top: '20%', left: '20%', right: '20%', bottom: 'auto' }
        }}
      >
        <ModalContent>
          <h2>Integration Successful!</h2>
          <p>Your terminal has been successfully integrated. To complete the process, please download the SDK below:</p>
          {/* <Button href="/downloads/sdk">Download SDK</Button> */}
          <SDK />
        </ModalContent>
      </Modal>

      {/* CTA Section */}
      <CTASection>
        <CTAButton href="/contact">Contact Us</CTAButton>
      </CTASection>
    </Container>
  );
}

export default API_Integration;
