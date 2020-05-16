import React, { Component } from 'react';
import './dashboard.css';

import LiveActiveCount from '../../components/common/live-active-count/LiveActiveCount';
import CreateButton from '../../components/common/create-button/CreateButton';
import CustomButton from '../../components/common/custom-button/CustomButton';
import CustomInput from '../../components/common/custom-input/CustomInput';
import SortingBar from '../../components/common/sorting-bar/SortingBar';
import Listlive from '../../components/common/list-live/Listlive';
import Sidebar from '../../components/sidebar/sidebar';
import redirect from '../../routes/redirect';
import Api from '../../service/Api';
import Modal from 'react-modal';

Modal.setAppElement('body');

class Dashboard extends Component {

  constructor(){
    super();

    this.state = {
      modal: false,
      title: '',
      description: '',
      date: '',
      password: '',
      error: '',
      lives: []
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value});
  }

  async componentWillMount() {
    const { data } = await Api.get('/api/lives');
    this.setState(() => ({lives: data}));
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { title, description, date, password } = this.state;

    if(!title || !password || !description || !date) {
      this.setState(() => ({ error: 'Fill in all the fields' }));
    } else {
      Api.post('/api/lives', {title, description, date, password})
      .then((res) => {
        
        this.onSubmitClean();

        redirect('/');

      })
      .catch(() => this.onSubmitFailure());
    }
  }

  onSubmitFailure() {
    this.setState({ error: "Request Failed" });
  }

  onSubmitClean() {
    this.setState({title: '', description: '', date: '', password: '', error: ''});
  }

  openModal = () => {
    this.setState({modal: true});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  render() {
    const { title, description, date, password, error, lives } = this.state;
    console.log(lives)
    return (
      <>
        <Sidebar/>
        <div className="container-dashboard"> 
          <div className="container-live">
            <CustomButton
              onClick={ this.openModal }
            />
            <LiveActiveCount count={ lives.length } />
          </div>
          <SortingBar/>
          
          <Listlive
            lives={ lives }
          />

          <Modal
            isOpen={this.state.modal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal">

            <form onSubmit={this.onSubmit}>
              <div className="container-form">
                <h1 style={{ fontWeight: 800, fontSize: 26 }}>New live</h1>

                <CustomInput
                  classs={'mt-40'}
                  type={'text'}
                  placeholder={'Title'}
                  value={title}
                  name={'title'}
                  onChange={this.handleChange}
                />

                <CustomInput
                  classs={'mt-40'}
                  type={'text'}
                  placeholder={'Description'}
                  value={description}
                  name={'description'}
                  onChange={this.handleChange}
                />

                <CustomInput
                  classs={'mt-40'}
                  type={'date'}
                  placeholder={''}
                  value={date}
                  name={'date'}
                  onChange={this.handleChange}
                />

                <CustomInput
                  classs={'mt-40'}
                  type={'password'}
                  placeholder={'Password'}
                  value={password}
                  name={'password'}
                  onChange={this.handleChange}
                />

                {
                  error && (

                    <div className="error">
                      <p style={{color: 'red'}}>{ error }</p>
                    </div>

                  )
                }
            
                <CreateButton
                  typeBtn="submit"
                  className={'btn btn-outlined purple-btn'}
                  children={'Create'}
                />
              </div>
            </form>
          </Modal>
        </div>
      </>
    )
  }
}

export default Dashboard;