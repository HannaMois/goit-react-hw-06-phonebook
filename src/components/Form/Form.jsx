import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { selectContacts } from 'redux/selectors';
import {
  Forms,
  FormLabel,
  FormInputName,
  FormInputTel,
  FormButton,
  ButtonSpan,
} from './Form.styled';

export default function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const contactFinder = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (contactFinder) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, number }));
    reset();
  };

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    if (name === 'name') {
      setName(value);
      return;
    }
    if (name === 'number') {
      setNumber(value);
      return;
    }
  };

  return (
    <Forms onSubmit={handleSubmit}>
      <FormLabel>
        Name:
        <FormInputName
          type="text"
          name="name"
          placeholder="Rosie Simpson"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
        />
      </FormLabel>
      <FormLabel>
        Number:
        <FormInputTel
          type="tel"
          name="number"
          placeholder="459-12-56"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required
        />
      </FormLabel>

      <FormButton type="submit">
        <ButtonSpan>add contact</ButtonSpan>
      </FormButton>
    </Forms>
  );
}
