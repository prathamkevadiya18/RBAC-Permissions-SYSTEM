import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,BeforeInsert,ManyToOne} from "typeorm";
import slugify from 'slugify';
import { role } from "../../role/entity/role.entity";
@Entity()
export class user{
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @ManyToOne(() => role, { nullable: true })
    role!: role;

    @Column({ unique: true })
    email !:string;

    @Column()
    pass!:string;

     @Column({ type: 'varchar', nullable: true })
     slug!: string ;
    
    @CreateDateColumn({ type: 'timestamp' })
     createat !: Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
     updateat !: Date;

    @DeleteDateColumn({type: 'timestamp' })
     deleteat !: Date;

    @BeforeInsert()
     genslug(){
         this.slug = slugify(this.email, { lower: true, strict: true });
     }
}