import React from 'react'
import { CreateTypeForm } from '../../../../../containers/Course/components/types/CreateTypeForm'
import ModalForm from '../../../../../utils/components/ModalForm'

const mockFn = () => {}

describe('CreateTypeForm component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <CreateTypeForm
                addType={mockFn}
                headerId={1}
                translate={() => ''}
                newOrder={1}
            />
        )
    })

    it('renders.', () => {
        expect(wrapper.find('.CreateTypeForm').exists()).toEqual(true)
    })

    describe('ModalForm onSubmit', () => {
        it('is a function.', () => {
            expect(typeof wrapper.find(ModalForm).props().onSubmit).toEqual(
                'function'
            )
        })
    })
})
