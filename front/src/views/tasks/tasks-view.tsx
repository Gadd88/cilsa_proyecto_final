import React from 'react'
import { TaskForm, TaskItem } from '../../components'
import { useTasks } from '../../hooks/useTasks'

export const TasksView = () => {

  const { taskList } = useTasks()

  return (
    <main className="p-5 max-w-6xl mx-auto flex flex-col space-y-10">
      <h1 className="text-7xl text-slate-200 text-center mb-10">
        Tareas
      </h1>
      <section>
        <h2 className='text-center font-black mb-5 text-3xl'>Crea una nueva tarea</h2>
        <TaskForm />
      </section>
      <section className='mx-auto'>
        <h2 className='text-center font-black mb-5 text-3xl'>Listado de tareas</h2>
        <ul className='flex flex-col gap-4 md:flex-row md:justify-start flex-wrap p-1 md:p-5'>
          {
            taskList?.map((task) => (
              <TaskItem task={task} key={task._id}/>
            ))
          }
        </ul>
      </section>
    </main>
  )
}
