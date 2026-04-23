import { Column, Entity ,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,BeforeInsert ,ManyToMany} from "typeorm";
import slugify from 'slugify'
import { role } from "../../role/entity/role.entity";

@Entity()
export class Permission{

    @PrimaryGeneratedColumn('uuid')
     id !:string;

    @Column()
     permission !: string; 
    
     @Column({ type: 'varchar', nullable: true })
     slug!: string ;
    
     @ManyToMany(() => role, role => role.permissions)
     name!: role[];

    @CreateDateColumn({ type: 'timestamp' })
     createat !: Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
     updateat !: Date;

    @DeleteDateColumn({type: 'timestamp' })
     deleteat !: Date;

    @BeforeInsert()
     genslug(){
         this.slug = slugify(this.permission.replace(/\//g, '_'), { lower: true, replacement: '_',strict:  false });
     }
}