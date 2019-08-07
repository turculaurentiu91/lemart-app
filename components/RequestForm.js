import React from 'react';
import { 
  KeyboardAvoidingView,
  View,
} from 'react-native';
import Input from './Input';
import SubmitButton from './SubmitButton';
import StringFormatValidation from 'string-format-validation';
import ImageSelector from './ImageSelector';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class RequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        model: '',
        request_address: '',
        person: '',
        description: '',
        images: [],
      },
      
      errors: []
    }
  }

  validationRules = {
    request_address: {
      min: 2,
    },
    person: {
      min: 2,
    },
    description: {
      min: 2,
    },
    model: {
      min: 2,
    },
  }

  haveError = error => this.state.errors.indexOf(error) !== -1;

  validateForm = () => {
    return Object.keys(this.state.formData).filter( key => {
      return !StringFormatValidation.validate(
        this.validationRules[key],
        this.state.formData[key],
      );
    });
  }

  submitForm = () => {
    const validationErrors = this.validateForm();
    if (validationErrors.length > 0) {
      this.setState({errors: validationErrors});
      return;
    }
    this.props.submitForm({
      ...this.state.formData,
      images: this.state.formData.images.map(img => img.base64),
    });
  }

  selectImage = img => {
    this.setState({
      formData: {
        ...this.state.formData, 
        images: [ 
          ...this.state.formData.images, 
          img,
        ]
      }
    });
  }

  removeImage = (indexToRemove) => {
    this.setState({
      formData: {
        ...this.state.formData,
        images: this.state.formData.images.filter((img, index) => index !== indexToRemove),
      }
    })
  }

  render() {

    return(
      <KeyboardAvoidingView
        behavior = 'padding'
        keyboardVerticalOffset = { 200 }
        enabled
        style = {{ marginTop: wp('15%'), width: '80%' }}
      >

        <ImageSelector 
          images={ this.state.formData.images } 
          selectImage={ this.selectImage }
          removeImage={ this.removeImage }
        />

        <Input
          value = { this.state.formData.model }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, model: value } }) }
          placeholder = "Marca Modello e Tipo"
          haveError = { this.haveError('model') }
          placeholderTextColor = "#333"
        />

        <Input
          value = { this.state.formData.request_address }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, request_address: value } }) }
          placeholder = "Indirizzo dell'intervento"
          haveError = { this.haveError('request_address') }
          placeholderTextColor = "#333"
        />

        <Input
          value = { this.state.formData.person }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, person: value } }) }
          placeholder = "Persona da Contattare"
          haveError = { this.haveError('person') }
          placeholderTextColor = "#333"
        />

        <Input
          value = { this.state.formData.description }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, description: value } }) }
          placeholder = "Descrizione Intervento Richiesto"
          haveError = { this.haveError('description') }
          placeholderTextColor = "#333"
          multiline = { true }
          numberOfLines = { 5 }
          style = {{
            
            textAlignVertical: "top"
          }}
        />

        <SubmitButton
          onPress = { this.submitForm }
        >
          INVIA RICHIESTA
        </SubmitButton>  
      </KeyboardAvoidingView>
    );
  }

}