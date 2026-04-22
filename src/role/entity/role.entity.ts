import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,ManyToMany,JoinTable } from "typeorm";
import slugify from 'slugify';
import { Permission } from "../../permission/entity/permission.entity";
@Entity()
export class role{

    @PrimaryGeneratedColumn('uuid')
    id !:string;
    
    @Column()
    name !: string;
    
    @Column()
    status !: boolean;
    
    @Column({ type: 'varchar', nullable: true })
    slug!: string ;
    

    @ManyToMany(() => Permission, permission => permission.name)
    @JoinTable()
    permissions !: Permission[];

    @CreateDateColumn({ type: 'timestamp' })
     createat !: Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
     updateat !: Date;

    @DeleteDateColumn({type: 'timestamp' })
     deleteat !: Date;

    @BeforeInsert()
     genslug(){
         this.slug = slugify(this.name, { lower: true, strict: true });
     }
}