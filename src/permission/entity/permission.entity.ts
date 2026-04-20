import { Column, Entity ,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,BeforeInsert } from "typeorm";
import slugify from 'slugify'
@Entity()
export class Permission{

    @PrimaryGeneratedColumn()
     id !:string;

    @Column()
     permission !: string; 
    
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
         this.slug = slugify(this.permission, { lower: true, strict: true });
     }
}