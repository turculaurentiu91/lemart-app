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
        type: '',
        person: '',
        description: '',
        images: [],
      },
      
      errors: []
    }
  }

  validationRules = {
    type: {
      min: 2,
    },
    person: {
      min: 2,
    },
    description: {
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
          value = { this.state.formData.type }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, type: value } }) }
          placeholder = "Tipologia Intervento Ricihesto"
          haveError = { this.haveError('type') }
          placeholderTextColor = "#333"
        />

        <Input
          value = { this.state.formData.person }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, person: value } }) }
          placeholder = "Persona di Riferimento"
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