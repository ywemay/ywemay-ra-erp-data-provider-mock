import { contacts } from './data/contacts'
import { findById } from './utils';
import { resources } from './data';

export { resources } from './data';

const getList =(resource, params) => new Promise((resolve, reject) => {
  let re;
  if (resources[resource]) {
    const r = resources[resource]
    resolve({ data: resources[resource], total: r.length})
  }
  resolve(re)
});

export const dataProvider = {
 getList, 
 getMany: getList,
 getOne: (resource, params) => new Promise((resolve, reject) => {
  if (resources[resource]) {
    const r = findById(resources[resource], params.id)
    resolve({ data: { ...r}})
  }
  else reject()
 }),
 update: (resource, params) => new Promise((resolve, reject) => {
  if (resources[resource]) {
    resources[resource] = resources[resource].map(v => {
      if (v.id.toString() == params.id.toString()) return {...v, ...params.data}
      return v;
    })
    resolve({ data: { id: params.id}})
  }
  else reject()
 }),
 create: (resource, params) => new Promise((resolve, _reject) => {
  if (resources[resource]) {
    const id = contacts.length + 1;
    resources[resource].push({id, ...params.data})
    resolve({data: resources[resource].find(c => id === c.id)})
  } else reject()
 }),
 delete: (resource, params) => new Promise((resolve, reject) => {
  if (resources[resource]) {
    resources[resource] = resources[resource].filter(c => params.id !== c.id)
    resolve({data: params.ids});
  }
  else reject()
 }),
 deleteMany: (resource, params) => new Promise((resolve, reject) => {
  if (resources[resource]) {
    resources[resource] = resources[resource].filter(c => !params.ids.includes(c.id))
    resolve({data: params.ids});
  }
  else reject()
 })
}