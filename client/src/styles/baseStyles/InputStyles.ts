// Export input styles
export const InputStyles = `

input,textarea {    
  border: none;
  outline: none;

  font-size: var(--small-m);
  padding-left: 20px;


  [id*="placeholder"] {
    text-transform: capitalize;
  }

  &::placeholder {
    text-transform: capitalize;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    text-transform: capitalize;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    text-transform: capitalize;
  }
}

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

`;
