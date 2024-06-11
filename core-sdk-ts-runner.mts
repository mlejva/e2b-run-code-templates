import'dotenv/config'
import {
  runTypeScript,
} from './core-sdk/ts-runner.mts'

// Testing TS code
const tsCode = `
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  deactivateUser(id: number): void {
    const user = this.getUserById(id);
    if (user) {
      user.isActive = false;
    }
  }

  listActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }
}

const userManager = new UserManager();
userManager.addUser({ id: 1, name: 'Alice', email: 'alice@example.com', isActive: true });
userManager.addUser({ id: 2, name: 'Bob', email: 'bob@example.com', isActive: true });

console.log('Active Users:', userManager.listActiveUsers());
userManager.deactivateUser(1);
console.log('Active Users after deactivation:', userManager.listActiveUsers());
`

console.log('**Running E2B example**')
console.log('- SDK: Core SDK')
console.log('- Coderunner: TypeScript')
console.log('************************\n')

console.log('**Code**\n', tsCode)
console.log('************************\n')


const processOutput = await runTypeScript(tsCode)
console.log('**Stdout**\n', processOutput.stdout)
console.log('\n**Stderr**\n', processOutput.stderr)

console.log('\n************************')
console.log('🏁 Example completed')
console.log('************************\n')
