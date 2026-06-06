import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { user } from './entity/user.entity';
import { role } from '../role/entity/role.entity';

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'yourpass',
    database: 'fullapp',
    entities: [user, role],
    synchronize: true,
  });
  await dataSource.initialize();

  try {
    const repo = dataSource.getRepository(user);
    const roleRepo = dataSource.getRepository(role);
    const email = 'superadmin@example.com';
    const password = 'admin@123';

    let superAdminRole = await roleRepo.findOne({ where: { name: 'SUPERADMIN' } });
    if (!superAdminRole) {
      superAdminRole = roleRepo.create({
        name: 'SUPERADMIN',
        status: true,
      });
      await roleRepo.save(superAdminRole);
    }

    const hashed = await bcrypt.hash(password, 10);
    const entity = repo.create({
      role: superAdminRole,
      email,
      pass: hashed,
    });
    await repo.save(entity);
    console.log('Superadmin created successfully:', email);
  } catch (error: any) {
    console.error('Seed runner error:', error.message);
  }
}
void runSeed();
