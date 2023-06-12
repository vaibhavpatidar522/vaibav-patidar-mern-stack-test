import React, { useEffect, useState } from 'react';
import { Container, Input, Table, Icon } from 'semantic-ui-react';
import UserRow from '../../components/UserRow/UserRow';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Home.module.css'
import API_BASE_URL from '../../features/config';

function Home() {
  const navigate = useNavigate();
  const headersTitle = ['ID', 'FullName', 'Email', 'Gender', 'Status', 'Profile', 'Action'];
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const [trigger, setTrigger] = useState(false);

  const navigateHandler = () => {
    navigate('/adduser');
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearchClick = (e) => {
    setSearch(searchValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/?page=${currentPage}&size=${5}&search=${search}`);
        if (response.ok) {
          const responseData = await response.json();

          setUsersData(responseData);
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    fetchData();
  }, [currentPage, search, trigger]);

  const handleExportCSV = () => {
    fetch(`${API_BASE_URL}/users/csv`, {
      method: 'GET',
      
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary URL for the blob object
        const url = URL.createObjectURL(blob);

        // Create a link element and click it to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
        link.click();

        // Clean up the temporary URL
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch
        console.error('Error exporting CSV:', error);
        toast.error(error)
      });
  };

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.serchContainer}>
          <Input placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)} />
          <button className={styles.primaryButton}  onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button  className={styles.primaryButton} onClick={navigateHandler} >
          <Icon  name='add' inverted color='grey'/>
            Add User
          </button>
          <button  className={styles.primaryButton} onClick={handleExportCSV} >
            Export To Csv
          </button>
        </div>
      </div>

      <Container className={styles.tableContainer}>
        <Table celled unstackable striped className={styles.dnxTable} >
          <Table.Header>
            <Table.Row>
              {headersTitle.map((title, key) => (
                <Table.HeaderCell key={key} style={{ backgroundColor: 'black', color: 'white' }}>
                  {title}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {usersData?.map((data) => (
              <UserRow key={data._id} data={data} onDelete={() => setTrigger(!trigger)} />
            ))}
          </Table.Body>
        </Table>

        <div className={styles.paginationContainer}>
          <button
            icon="angle left"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
               <Icon  name='angle left' inverted color='grey' />
            </button>
          <button content={`${currentPage}`}
            className={styles.primaryButton}
            > {currentPage}</button>
          <button
            icon="angle right"
            onClick={handleNextPage}
            className={styles.paginationButton}>
              <Icon  name='angle right' inverted color='grey'/>
          </button>
        </div>
      </Container>
    </Container>
  );
}

export default Home;
