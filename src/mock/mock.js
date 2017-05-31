import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users,Task,Counter,MailCode,MenuList,Department,Character,Account,CampusList,JobList,CityList,DepartList,LevelList} from './user.js';
let _Users = Users;
let _Task = Task;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

mock.onPost('static/img').reply(200, {
      msg: 'success'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

//get task list
mock.onGet('/task').reply(config => {
  // let {title, date,desc} = config.params;
  let taskList = _Task;
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,taskList]); //[{},{}]
    }, 0);
      })
    });

//get counter list
mock.onGet('/counter').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,Counter]); //[{},{}]
    }, 0);
      })
    });

//get mailcode list
mock.onPost('/mailcode').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,MailCode]); //[{},{}]
    }, 0);
      })
    });


//get menu list
mock.onGet('/menu').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,MenuList]); //[{},{}]
    }, 0);
      })
    });

//get department list
mock.onPost('/department').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,Department]); //[{},{}]
    }, 0);
      })
    });

//get department list
mock.onPost('/character').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,Character]); //[{},{}]
    }, 0);
      })
    });

//get department list
mock.onPost('/account').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,Account]); //[{},{}]
    }, 0);
      })
    });


//get campus list
mock.onGet('/campusList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,CampusList]); //[{},{}]
    }, 0);
      })
    });

//get campus list
mock.onGet('/jobList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,JobList]); //[{},{}]
    }, 0);
      })
    });

mock.onGet('/cityList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,CityList]); //[{},{}]
    }, 0);
      })
    });


mock.onGet('/departList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,DepartList]); //[{},{}]
    }, 0);
      })
    });


mock.onGet('/levelList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
        resolve([200,LevelList]); //[{},{}]
    }, 0);
      })
    });



    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
};