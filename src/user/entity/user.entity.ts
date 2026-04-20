import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,BeforeInsert} from "typeorm";
import slugify from 'slugify';
@Entity()
export class user{
    @PrimaryGeneratedColumn('uuid')
    id!:number;

    @Column({nullable: true})
    role!:string;

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
         this.slug = slugify(this.role, { lower: true, strict: true });
     }
}