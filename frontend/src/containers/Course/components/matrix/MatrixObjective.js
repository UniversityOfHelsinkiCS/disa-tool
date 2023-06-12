import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
    Button,
    Label,
    Popup,
    Header,
    Loader,
    Segment,
    Grid,
} from 'semantic-ui-react'

import asyncAction from '../../../../utils/asyncAction'
import { removeObjective, editObjective } from '../../actions/objectives'
import {
    addObjectiveToTask,
    removeObjectiveFromTask,
} from '../../actions/tasks'
import { taskDetails } from '../../../../api/objectives'
import EditObjectiveForm from './EditObjectiveForm'
import DeleteForm from '../../../../utils/components/DeleteForm'
import MathJaxText from '../../../../utils/components/MathJaxText'

import DnDItem from '../../../../utils/components/react-dnd/DnDItem'
/*
export const dropSpec = {
    ...defaults.dropSpec,
    drop: (props, monitor) => {
        const drag = monitor.getItem()
        const { element, slots } = props
        let slot
        if (
            element.category_id !== drag.category_id ||
            element.skill_level_id !== drag.skill_level_id
        ) {
            slot = slots ? slots.previous : element.order
        } else if (drag.order === element.order) {
            slot = drag.order
        } else if (drag.order > element.order) {
            slot = slots.previous
        } else {
            slot = slots.next
        }
        props.mover({
            id: drag.id,
            order: slot,
            category_id: element.category_id,
            skill_level_id: element.skill_level_id,
        })
    },
}
*/
/*const DnDItem = dndItem('objective', {
    dropSpec,
    dragSpec: {
        ...defaults.dragSpec,
        beginDrag: (props) => ({
            id: props.element.id,
            order: props.element.order,
            category_id: props.element.category_id,
            skill_level_id: props.element.skill_level_id,
        }),
    },
})
*/
const MatrixObjective = (props) => {
    const [state, setState] = useState({
        triggered: false,
        loading: true,
        cumulative_multiplier: 0,
        tasks: [],
    })

    const toggleObjective = () => {
        if (props.activeTaskId !== null) {
            props.toggleObjective({
                objective_id: props.objective.id,
                task_id: props.activeTaskId,
            })
        }
    }

    const loadDetails = async () => {
        if (state.triggered) {
            return
        }
        setState({ ...state, triggered: true })
        const objectiveDetails = (
            await props.taskDetails({ id: props.objective.id })
        ).data.data
        let cumMultiplier = 0
        objectiveDetails.tasks.forEach((task) => {
            cumMultiplier += task.multiplier
        })
        setState({
            cumulative_multiplier: cumMultiplier,
            tasks: objectiveDetails.tasks,
            loading: false,
        })
    }

    const { t } = useTranslation(`Course.matrix.MatrixObjective`)

    const content = (
        <div className="flexContainer">
            <div className="objectiveBlock flexContainer">
                {props.showDetails ? (
                    <Button
                        className="objectiveButton"
                        toggle
                        active={props.active}
                        compact
                        basic
                        fluid
                        style={{
                            borderRadius: '0px',
                            cursor: props.activeTaskId ? undefined : 'default',
                        }}
                        onClick={toggleObjective}
                    >
                        <MathJaxText content={props.objective.name} />
                    </Button>
                ) : (
                    <Segment
                        className="objectiveSegment"
                        style={{ borderRadius: '0px' }}
                    >
                        <MathJaxText content={props.objective.name} />
                    </Segment>
                )}
                {props.showDetails ? (
                    <div>
                        <Popup
                            trigger={
                                <Label
                                    size="large"
                                    circular
                                    content={props.objective.task_count}
                                    onMouseOver={loadDetails}
                                    onFocus={loadDetails}
                                    style={{
                                        color:
                                            props.objective.task_count === 0
                                                ? 'red'
                                                : undefined,
                                    }}
                                />
                            }
                            content={
                                state.loading ? (
                                    <Loader active inline />
                                ) : (
                                    <div>
                                        <div>
                                            <span>{t('cumulative')}</span>
                                            <Label>
                                                <strong>
                                                    {state.cumulative_multiplier.toFixed(
                                                        2
                                                    )}
                                                </strong>
                                            </Label>
                                        </div>
                                        <Header>
                                            <span className="capitalize">
                                                {t('tasks')}
                                            </span>
                                        </Header>
                                        <Grid>
                                            {state.tasks.map((task) => (
                                                <Grid.Row key={task.name}>
                                                    <Grid.Column width={12}>
                                                        <span>{task.name}</span>
                                                    </Grid.Column>
                                                    <Grid.Column
                                                        width={4}
                                                        textAlign="left"
                                                    >
                                                        <Label>
                                                            {Number(
                                                                task.multiplier
                                                            ).toFixed(2)}
                                                        </Label>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            ))}
                                        </Grid>
                                    </div>
                                )
                            }
                        />
                    </div>
                ) : null}
            </div>
            {props.editing ? (
                <div className="removeBlock">
                    <EditObjectiveForm
                        style={{ margin: '5px auto 5px auto' }}
                        objectiveId={props.objective.id}
                    />
                    <DeleteForm
                        style={{ margin: '5px auto 5px auto' }}
                        onExecute={() =>
                            props.removeObjective({
                                id: props.objective.id,
                            })
                        }
                        prompt={[
                            t('delete_prompt_1'),
                            `"${props.objective.name}"`,
                        ]}
                        header={t('delete_header')}
                    />
                </div>
            ) : null}
        </div>
    )
    if (props.editing) {
        return (
            <div className="MatrixObjective">
                <DnDItem
                    element={{
                        ...props.objective,
                        category_id: props.categoryId,
                        skill_level_id: props.skillLevelId,
                    }}
                    mover={props.moveObjective}
                    slots={props.slots}
                >
                    {content}
                </DnDItem>
            </div>
        )
    }
    return <div className="MatrixObjective">{content}</div>
}

MatrixObjective.propTypes = {
    objective: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        task_count: PropTypes.number,
    }).isRequired,
    editing: PropTypes.bool.isRequired,
    removeObjective: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    toggleObjective: PropTypes.func.isRequired,
    activeTaskId: PropTypes.number,
    taskDetails: PropTypes.func.isRequired,
    showDetails: PropTypes.bool,
    lastMultiplierUpdate: PropTypes.instanceOf(Date),
    translate: PropTypes.func.isRequired,
    moveObjective: PropTypes.func.isRequired,
    categoryId: PropTypes.number.isRequired,
    skillLevelId: PropTypes.number.isRequired,
    slots: PropTypes.shape({
        previous: PropTypes.number.isRequired,
        next: PropTypes.number.isRequired,
    }).isRequired,
}

MatrixObjective.defaultProps = {
    activeTaskId: null,
    showDetails: false,
    lastMultiplierUpdate: null,
}

const mapStateToProps = (state) => ({
    lastMultiplierUpdate: state.task.lastMultiplierUpdate,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    removeObjective: asyncAction(removeObjective, dispatch),
    toggleObjective: ownProps.active
        ? asyncAction(removeObjectiveFromTask, dispatch)
        : asyncAction(addObjectiveToTask, dispatch),
    taskDetails,
    moveObjective: asyncAction(editObjective, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MatrixObjective)
