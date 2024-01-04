import React from 'react'
import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import axios from 'axios'
import {
    Box,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    FormHelperText,
} from '@chakra-ui/react'

function Register() {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [States, setStates] = useState([])
    const [stateOfOrigin, setStateOfOrigin] = useState('')
    const [localGovernment, setlocalGovernment] = useState([])
    const [copied, setCopied] = useState(false)
    const [CitizenId, setCitizenId] = useState('')
    const [localGov, setLocalGov] = useState('')
    const [loading, setLoading] = useState(false)


    const notification = useToast()

    useEffect(() => {
        FetchStates()
    }, [])

    useEffect(() => {
        if (stateOfOrigin) {
            FetchlocalGov(stateOfOrigin)
        } else {
            setlocalGovernment([])
            setLocalGov('')
        }
    }, [stateOfOrigin])
    const FetchStates = async () => {
        try {
            const response = await axios.get('https://vasconaija.onrender.com/')
            //const data = await response.json()
            //console.log(response.data)
            setStates(response.data)
            console.log(States)
        } catch (error) {
            console.log(error.message)
        }
    }
    const FetchlocalGov = async () => {
        try {
            const response = await axios.get(`https://vasconaija.onrender.com/${stateOfOrigin}`)
            // console.log(response.data.localGovernments)
            setlocalGovernment(response.data.localGovernments)
        } catch (error) {
            console.log('error fetching local Governments')
        }
    }

    const handleState = (e) => {
        const selectedState = e.target.value
        setStateOfOrigin(selectedState)
    }

    const handleLocalGov = (e) => {
        setLocalGov(e.target.value)
    }
    const SubmitForm = async () => {
        setLoading(true)
        if (!firstName || !lastName || !middleName || !email || !phoneNumber || !dateOfBirth || !stateOfOrigin || !localGov) {
            notification({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const data = await axios.post(
                '/api/Citizens', {
                firstName,
                lastName,
                middleName,
                phoneNumber,
                email,
                stateOfOrigin,
                localGov,
                dateOfBirth
            }, config
            )
            const newCitizenId = data.data._id
            setCitizenId(newCitizenId)
            //console.log(data.data._id)
            notification({
                title: `Registration successful, your Citizen Id is: ${data.data._id}`,
                status: 'success',
                duration: 50000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
            //console.log(data.data._id)
        } catch (error) {
            console.log(error)
            notification({
                title: 'An error occured',
                description: error.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
        }
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(CitizenId)
        setCopied(true)
        notification({
            title: 'Id copied to clipboard!',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right'
        })
    }
    return (
        <Box borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={1000}
            p={5}
            m="10px auto"
            mt='5%'
            as="form">
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Citizen Registration
      </Heading>
            <Flex>
                <FormControl mr="5%">
                    <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                        First name
          </FormLabel>
                    <Input id="first-name" placeholder="First name" type='text' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="middle-name" fontWeight={'normal'}>
                        Middle name
          </FormLabel>
                    <Input id="middle-name" placeholder="middle name" type='text' value={middleName} onChange={(e) => { setMiddleName(e.target.value) }} />
                </FormControl>
            </Flex>
            <Flex>
                <FormControl mr="5%">
                    <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                        Last name
          </FormLabel>
                    <Input id="last-name" placeholder="last name" type='text' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                        Phone number
          </FormLabel>
                    <Input id="Phone-number" placeholder="Phone number" type='number' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                </FormControl>
            </Flex>
            <FormControl mt="2%">
                <FormLabel htmlFor="email" fontWeight={'normal'}>
                    Email address
        </FormLabel>
                <Input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='enter email here' />
                <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                        htmlFor="State of Origin"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        State of Origin
        </FormLabel>
                    <Select
                        id="State Of Origin"
                        name="State Of Origin"
                        //autoComplete="country"
                        value={stateOfOrigin}
                        onChange={handleState}
                        placeholder="--Select state of Origin--"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md">
                        <option value='' > -- select a state -- </option>
                        {States.map((state) => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl as={GridItem} colSpan={[1, 1]} mt="2%">
                    <FormLabel
                        htmlFor="localGovernment"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Local Government
        </FormLabel>
                    <Select
                        id="localGovernment"
                        name="localGovernment"
                        value={localGov}
                        onChange={handleLocalGov}
                        placeholder="--Select LocalGov--"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md">
                        <option value='' > -- select your local Government -- </option>
                        {localGovernment.map((local) => (
                            <option key={local.id} value={local.id}> {local.name}</option>
                        ))}
                    </Select>
                </FormControl>


                <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                    <FormLabel
                        htmlFor="DateOfBirth"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}
                        mt="2%">
                        Date Of Birth
        </FormLabel>
                    <Input
                        type="date"
                        name="DOB"
                        id="DOB"
                        //autoComplete="city"
                        value={dateOfBirth}
                        onChange={(e) => { setDateOfBirth(e.target.value) }}
                        placeholder='enter date of Birth here'
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                    />
                </FormControl>
                <FormHelperText mb='3%'>We&apos;ll never share your details.</FormHelperText>
                <Button
                    w="7rem"
                    mt='3%'
                    colorScheme="red"
                    variant="solid"
                    isLoading={loading}
                    onClick={SubmitForm}>
                    Submit
                                </Button>
                {CitizenId && (
                    <div>
                        <span>Your Citizen ID:{CitizenId}</span>
                        <CopyIcon onClick={handleCopy} disable={copied}>Copy ID</CopyIcon>
                    </div>
                )}
            </FormControl>
        </Box>
    )
}

export default Register
