import { Button, Chip, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { StateAwareProps } from '@/interfaces/state-aware-props.interface'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(2, 0),
    minWidth: 120,
  },
  chips: {},
  chip: {},
}))

const Activities = ['Playing outside', 'Drawing', 'Singing', 'Dancing', 'Learning', 'Science']

export interface Child {
  name?: string
  age?: number
  interests?: string[]
}

interface ChildInfoProps extends Child {
  onChange?: (child: Child) => void
}

export const ChildInfo: React.FC<ChildInfoProps> = ({
  name: initialName,
  age: initialAge = 0,
  interests: initialInterests = [],
  onChange,
}) => {
  const classes = useStyles()
  const [name, setName] = useState(initialName)
  const [age, setAge] = useState(initialAge)
  const [interests, setInterests] = useState(initialInterests)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onChange) {
      onChange({ name, age, interests })
    }
  }

  return (
    <form className={classes.form}>
      <TextField
        className={classes.formControl}
        label="Name"
        name="name"
        autoFocus
        margin="normal"
        required
        fullWidth
        value={name}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => setName(event.target.value as string)}
      />
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="age-select-label">Age</InputLabel>
        <Select
          labelId="age-select-label"
          native
          value={age}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => setAge(event.target.value as number)}
        >
          {Array(19)
            .fill(null)
            .map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="interests-select-label">Interests</InputLabel>
        <Select
          labelId="interests-select-label"
          multiple
          value={interests}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => setInterests(event.target.value as string[])}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
        >
          {Activities.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={(event) => handleSubmit(event)}
      >
        Add information
      </Button>
    </form>
  )
}
